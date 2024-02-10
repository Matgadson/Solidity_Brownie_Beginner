// SPDX-License-Identifier: MIT
pragma solidity  ^0.6.6;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Lottery {
    
    address payable[] public players;
    uint256 public usdEntryFee;
    AggregatorV3Interface internal ethUsdPriceFeed;

    constructor(address _priceFeedAddres) public {
        usdEntryFee = 50 * (10**18);
        ethUsdPriceFeed = AggregatorV3Interface(_priceFeedAddres);
    }

    function enter() public payable {
        //R50 minimum deposit
        
        players.push(msg.sender);
    }

    function getEntranceFee() public view returns (uint256) {
        //
        (, int256 price, , , ,) = ethUsdPriceFeed.latestRoundData;
        uint256 adjustedPrice = uint256(price) *10 ** 10;
        uint256 costToEnter = (usdEntryFee * 10 ** 18) / price;
        return costToEnter;
    }

    function startLottery () public {
        
    }

    function endLottery() public {

    }
}