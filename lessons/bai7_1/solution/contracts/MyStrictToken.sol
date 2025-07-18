// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyStrictToken is ERC20, Ownable {
    mapping(address => bool) public whitelist;
    
    // Events
    event AddedToWhitelist(address indexed user);
    event RemovedFromWhitelist(address indexed user);
    event TokensMinted(address indexed to, uint256 amount);
    event EthWithdrawn(address indexed to, uint256 amount);
    event TokensWithdrawn(address indexed token, address indexed to, uint256 amount);
    
    constructor() ERC20("MyStrictToken", "MST") Ownable(msg.sender) {
        whitelist[msg.sender] = true;
    }

    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "Not whitelisted");
        _;
    }

    // Transfer and transferFrom should only be allowed for whitelisted addresses
    function transfer(address to, uint256 amount) public override onlyWhitelisted returns (bool) {
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) public override onlyWhitelisted returns (bool) {
        return super.transferFrom(from, to, amount);
    }

    function addToWhitelist(address user) external onlyOwner {
        require(user != address(0), "Cannot whitelist zero address");
        require(!whitelist[user], "Address already whitelisted");
        whitelist[user] = true;
        emit AddedToWhitelist(user);
    }
    
    function removeFromWhitelist(address user) external onlyOwner {
        require(whitelist[user], "Address not whitelisted");
        whitelist[user] = false;
        emit RemovedFromWhitelist(user);
    }

    function isWhitelisted(address user) external view returns (bool) {
        return whitelist[user];
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        payable(owner()).transfer(balance);
        emit EthWithdrawn(owner(), balance);
    }

    function withdrawToken(address token, uint256 amount) external onlyOwner {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than zero");
        
        IERC20 tokenContract = IERC20(token);
        uint256 tokenBalance = tokenContract.balanceOf(address(this));
        require(tokenBalance >= amount, "Insufficient token balance");
        
        bool success = tokenContract.transfer(owner(), amount);
        require(success, "Token transfer failed");
        
        emit TokensWithdrawn(token, owner(), amount);
    }
}