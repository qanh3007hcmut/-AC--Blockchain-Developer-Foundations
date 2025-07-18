import { ethers } from "hardhat";

async function main() {
  // Get command line arguments
  const tokenAddress = "0xabEcAF090BB035A30383b4CD9D22919Cf64ffCe4";
  const accountAddress = "0x8492567253C49080ceB724477912F6D5aACe76c2";

  try {
    // Get token contract instance
    const token = await ethers.getContractAt("MyMintableToken", tokenAddress);
    
    // Get token details
    const name = await token.name();
    const symbol = await token.symbol();
    
    // Get balance
    const balance = await token.balanceOf(accountAddress);
    
    console.log(`Token: ${name} (${symbol})`);
    console.log(`Address: ${tokenAddress}`);
    console.log(`Account: ${accountAddress}`);
    console.log(`Balance: ${ethers.formatEther(balance)}`);
  } catch (error) {
    console.error("Error checking balance:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });