// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ProxyContract is Ownable, Pausable, ReentrancyGuard {
    using Address for address payable;

    address private _daoContract;
    address private _gnosisSafe;

    event TransactionExecuted(address indexed sender, address indexed destination, uint256 value, bytes data);

    constructor(address daoContract, address gnosisSafe) {
        _daoContract = daoContract;
        _gnosisSafe = gnosisSafe;
    }

    function executeTransaction(
        address destination,
        uint256 value,
        bytes memory data
    ) external whenNotPaused nonReentrant onlyOwner {
        require(_daoContract == msg.sender, "ProxyContract: caller is not the DAO contract");
        require(destination != address(0), "ProxyContract: invalid destination address");

        (bool success, ) = _gnosisSafe.call{value: value}(data);
        require(success, "ProxyContract: transaction execution failed");

        emit TransactionExecuted(_daoContract, destination, value, data);
    }

    function setDaoContract(address daoContract) external onlyOwner {
        require(daoContract != address(0), "ProxyContract: invalid DAO contract address");
        _daoContract = daoContract;
    }

    function setGnosisSafe(address gnosisSafe) external onlyOwner {
        require(gnosisSafe != address(0), "ProxyContract: invalid Gnosis Safe address");
        _gnosisSafe = gnosisSafe;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
