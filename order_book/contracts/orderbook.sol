// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "openzeppelin-contracts/token/ERC20/ERC20.sol";
import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/security/Pausable.sol";
import "openzeppelin-contracts/security/ReentrancyGuard.sol";
import "openzeppelin-contracts/utils/math/SafeMath.sol";


contract OrderBook is ERC20, Ownable, Pausable, ReentrancyGuard {
    using SafeMath for uint256;

    struct Order {
        address trader;
        uint256 amount;
        uint256 price;
        bool isCancelled;
    }

    address public platformToken;
    uint256 public feeRate;

    mapping(address => Order[]) public buyOrders;
    mapping(address => Order[]) public sellOrders;
    mapping(address => bool) public authorizedIssuers;
    mapping(address => bool) public approvedTokens;

    event TradeExecuted(address indexed buyer, address indexed seller, uint256 amount, uint256 price);
    event TokensIssued(address indexed issuer, address indexed recipient, string tokenName, string tokenSymbol, uint256 initialSupply);
    event IssuerAuthorized(address indexed issuer);
    event IssuerRevoked(address indexed issuer);
    event OrderPlaced(address indexed trader, bool isBuyOrder, uint256 amount, uint256 price);
    event OrderCancelled(address indexed trader, bool isBuyOrder, uint256 orderIndex);
    event OrderUpdated(address indexed trader, bool isBuyOrder, uint256 orderIndex, uint256 newAmount, uint256 newPrice);

    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender], "Not an authorized issuer");
        _;
    }

    modifier onlyPlatformToken() {
        require(msg.sender == platformToken, "Only platform token is allowed");
        _;
    }

    modifier validOrderIndex(address _trader, uint256 _orderIndex, bool _isBuyOrder) {
        require(_orderIndex < getOrderCount(_trader, _isBuyOrder), "Invalid order index");
        _;
    }

    modifier onlyApprovedToken() {
        require(approvedTokens[msg.sender], "Only approved tokens can call this function");
        _;
    }

    constructor(address _platformToken, uint256 _feeRate) ERC20("YourToken", "YTK") {
        platformToken = _platformToken;
        feeRate = _feeRate;
        _mint(msg.sender, 1000000 * 10**18);
    }

    function setPlatformToken(address _platformToken) external onlyOwner {
        platformToken = _platformToken;
    }

    function setFeeRate(uint256 _feeRate) external onlyOwner {
        feeRate = _feeRate;
    }

    function authorizeIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = true;
        emit IssuerAuthorized(_issuer);
    }

    function revokeIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = false;
        emit IssuerRevoked(_issuer);
    }

    function placeBuyOrder(uint256 _amount, uint256 _price) external whenNotPaused onlyPlatformToken {
        Order memory newOrder = Order(msg.sender, _amount, _price, false);
        buyOrders[msg.sender].push(newOrder);
        emit OrderPlaced(msg.sender, true, _amount, _price);
    }

    function placeSellOrder(uint256 _amount, uint256 _price) external whenNotPaused onlyApprovedToken {
        Order memory newOrder = Order(msg.sender, _amount, _price, false);
        sellOrders[msg.sender].push(newOrder);
        emit OrderPlaced(msg.sender, false, _amount, _price);
    }

    function addApprovedToken(address _token) external onlyOwner {
        approvedTokens[_token] = true;
    }

    function removeApprovedToken(address _token) external onlyOwner {
        approvedTokens[_token] = false;
    }

    function cancelOrder(bool _isBuyOrder, uint256 _orderIndex) external {
        address trader = msg.sender;
        Order[] storage orders = _isBuyOrder ? buyOrders[trader] : sellOrders[trader];
        require(_orderIndex < orders.length, "Invalid order index");

        Order storage order = orders[_orderIndex];
        require(!order.isCancelled, "Order is already cancelled");
        require(order.trader == trader, "Not the order owner");

        order.isCancelled = true;
        emit OrderCancelled(trader, _isBuyOrder, _orderIndex);
    }

    function updateOrder(bool _isBuyOrder, uint256 _orderIndex, uint256 _newAmount, uint256 _newPrice) external {
        address trader = msg.sender;
        Order[] storage orders = _isBuyOrder ? buyOrders[trader] : sellOrders[trader];
        require(_orderIndex < orders.length, "Invalid order index");

        Order storage order = orders[_orderIndex];
        require(!order.isCancelled, "Cannot update a cancelled order");
        require(order.trader == trader, "Not the order owner");

        order.amount = _newAmount;
        order.price = _newPrice;
        emit OrderUpdated(trader, _isBuyOrder, _orderIndex, _newAmount, _newPrice);
    }

    function getOrderCount(address _trader, bool _isBuyOrder) internal view returns (uint256) {
        return _isBuyOrder ? buyOrders[_trader].length : sellOrders[_trader].length;
    }

    function executeTrade(
        address _buyer,
        uint256 _buyOrderIndex,
        address _seller,
        uint256 _sellOrderIndex,
        uint256 _amount
    ) external whenNotPaused nonReentrant validOrderIndex(_buyer, _buyOrderIndex, true) validOrderIndex(_seller, _sellOrderIndex, false) {
        Order storage buyOrder = buyOrders[_buyer][_buyOrderIndex];
        Order storage sellOrder = sellOrders[_seller][_sellOrderIndex];

        require(buyOrder.amount >= _amount, "Insufficient buy order amount");
        require(sellOrder.amount >= _amount, "Insufficient sell order amount");
        require(!buyOrder.isCancelled, "Buy order has been cancelled");
        require(!sellOrder.isCancelled, "Sell order has been cancelled");

        emit TradeExecuted(_buyer, _seller, _amount, sellOrder.price);

        buyOrder.amount = buyOrder.amount.sub(_amount);
        sellOrder.amount = sellOrder.amount.sub(_amount);

        _transfer(sellOrder.trader, buyOrder.trader, _amount);

        uint256 fee = _amount.mul(sellOrder.price).mul(feeRate).div(100);
        uint256 netAmount = _amount.mul(sellOrder.price).sub(fee);
        ERC20(platformToken).transferFrom(buyOrder.trader, sellOrder.trader, netAmount);
        ERC20(platformToken).transferFrom(buyOrder.trader, owner(), fee);

        if (buyOrder.amount == 0) {
            _removeOrder(_buyer, _buyOrderIndex, true);
        }

        if (sellOrder.amount == 0) {
            _removeOrder(_seller, _sellOrderIndex, false);
        }
    }

    function _removeOrder(address _trader, uint256 _orderIndex, bool _isBuyOrder) private {
        Order[] storage orders = _isBuyOrder ? buyOrders[_trader] : sellOrders[_trader];
        uint256 lastIndex = orders.length - 1;

        Order memory lastOrder = orders[lastIndex];
        orders[_orderIndex] = lastOrder;

        orders.pop();
    }
}
