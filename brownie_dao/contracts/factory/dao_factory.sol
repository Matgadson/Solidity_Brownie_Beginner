// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/Address.sol";

contract DAOFactory is Ownable, Pausable, ReentrancyGuard {
    using Address for address payable;

    address public daoTemplate; // Address of the DAO contract template
    address public gnosisSafeTemplate; // Address of the Gnosis Safe template
    address public proxyContractTemplate; // Address of the proxy contract template

    event DAOCreated(address indexed daoContract, address indexed gnosisSafe, address indexed proxyContract);

    constructor(address _daoTemplate, address _gnosisSafeTemplate, address _proxyContractTemplate) {
        daoTemplate = _daoTemplate;
        gnosisSafeTemplate = _gnosisSafeTemplate;
        proxyContractTemplate = _proxyContractTemplate;
    }

    function createDAO() external whenNotPaused nonReentrant returns (address daoContract, address gnosisSafe, address proxyContract) {
        daoContract = address(new DAO());
        gnosisSafe = address(new GnosisSafe());
        proxyContract = address(new ProxyContract(daoContract, gnosisSafe));

        emit DAOCreated(daoContract, gnosisSafe, proxyContract);
    }

    function setTemplates(address _daoTemplate, address _gnosisSafeTemplate, address _proxyContractTemplate) external onlyOwner {
        daoTemplate = _daoTemplate;
        gnosisSafeTemplate = _gnosisSafeTemplate;
        proxyContractTemplate = _proxyContractTemplate;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
