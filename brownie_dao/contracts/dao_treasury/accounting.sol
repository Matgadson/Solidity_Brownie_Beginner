// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DAO is Ownable, Pausable, ReentrancyGuard {
    using SafeMath for uint256;

    mapping(address => uint256) public etherBalances;
    mapping(address => mapping(address => uint256)) public tokenBalances;

    IERC20 public token;

    event EtherDeposit(address indexed account, uint256 amount);
    event EtherWithdrawal(address indexed account, uint256 amount);
    event TokenDeposit(address indexed account, uint256 amount);
    event TokenWithdrawal(address indexed account, uint256 amount);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function depositEther() external payable whenNotPaused nonReentrant {
        require(msg.value > 0, "DAO: deposit amount must be greater than zero");
        etherBalances[msg.sender] = etherBalances[msg.sender].add(msg.value);
        emit EtherDeposit(msg.sender, msg.value);
    }

    function withdrawEther(uint256 amount) external whenNotPaused nonReentrant {
        require(amount > 0, "DAO: withdrawal amount must be greater than zero");
        require(amount <= etherBalances[msg.sender], "DAO: insufficient balance");

        etherBalances[msg.sender] = etherBalances[msg.sender].sub(amount);
        payable(msg.sender).sendValue(amount);
        emit EtherWithdrawal(msg.sender, amount);
    }

    function depositToken(uint256 amount) external whenNotPaused nonReentrant {
        require(amount > 0, "DAO: deposit amount must be greater than zero");

        bool success = token.transferFrom(msg.sender, address(this), amount);
        require(success, "DAO: token transfer failed");

        tokenBalances[msg.sender][address(token)] = tokenBalances[msg.sender][address(token)].add(amount);
        emit TokenDeposit(msg.sender, amount);
    }

    function withdrawToken(uint256 amount) external whenNotPaused nonReentrant {
        require(amount > 0, "DAO: withdrawal amount must be greater than zero");
        require(amount <= tokenBalances[msg.sender][address(token)], "DAO: insufficient token balance");

        tokenBalances[msg.sender][address(token)] = tokenBalances[msg.sender][address(token)].sub(amount);
        bool success = token.transfer(msg.sender, amount);
        require(success, "DAO: token transfer failed");

        emit TokenWithdrawal(msg.sender, amount);
    }

    // You can add functions to calculate voting power based on token balances,
    // or any other functionality related to token ownership or voting.

    // For example:
    // function getVotingPower(address member) public view returns (uint256) {
    //     return tokenBalances[member][address(token)];
    // }
}
