import { ethers } from "hardhat";
import { getNamedAccounts } from "hardhat";

async function main() {
  // Get command line arguments
  const tokenAddress = "0xabEcAF090BB035A30383b4CD9D22919Cf64ffCe4";
  const amount = "1000";

  try {
    // Get named accounts
    const { user } = await getNamedAccounts();
    
    // Get signers - user is at index 1
    const signers = await ethers.getSigners();
    const userSigner = signers[1];
    
    
    // Get token contract instance
    const token = await ethers.getContractAt("MyMintableToken", tokenAddress, userSigner);
    
    // Get token details
    const name = await token.name();
    const symbol = await token.symbol();
    
    console.log(`Token: ${name} (${symbol})`);
    console.log(`User address: ${user}`);
    
    // Get initial balance
    const initialBalance = await token.balanceOf(user);
    console.log(`Initial balance of recipient: ${ethers.formatEther(initialBalance)} ${symbol}`);
    
    // Mint tokens
    const amountWei = ethers.parseEther(amount);
    console.log(`Attempting to mint ${amount} ${symbol} to ${user}...`);
    
    try {
      const tx = await token.mint(user, amountWei);
      await tx.wait();
      
      // Get final balance
      const finalBalance = await token.balanceOf(user);
      
      console.log(`Mint successful!`);
      console.log(`Final balance of recipient: ${ethers.formatEther(finalBalance)} ${symbol}`);
    } catch (error) {
      console.error(`Mint failed. This is expected if the user is not the owner of the contract.`);
      console.error(`Error message: ${error}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });