import { ethers } from "hardhat";
import { getNamedAccounts } from "hardhat";

async function main() {
  // Get command line arguments
  const tokenAddress = "0x00e080eC0a8F678cD25FC0410C9a8Cf69332a302";

  try {
    // Get named accounts
    const { deployer, user } = await getNamedAccounts();
    
    // Address to whitelist (default to user if not specified)
    const targetAddress = user;
    
    // Get deployer signer (owner of the contract)
    const [deployerSigner] = await ethers.getSigners();
    
    // Get token contract instance with deployer (owner) signer
    const token = await ethers.getContractAt("MyStrictToken", tokenAddress, deployerSigner);
    
    // Get token details
    const name = await token.name();
    const symbol = await token.symbol();
    
    console.log(`Token: ${name} (${symbol})`);
    console.log(`Owner/Deployer address: ${deployer}`);
    console.log(`Address to whitelist: ${targetAddress}`);

    // Check if address is already whitelisted
    const isAlreadyWhitelisted = await token.isWhitelisted(targetAddress);
    
    // if (isAlreadyWhitelisted) {
    //   console.log(`Address ${targetAddress} is already whitelisted`);
    //   return;
    // }

    // // Add address to whitelist
    // console.log(`Adding ${targetAddress} to whitelist...`);
    // const tx = await token.addToWhitelist(targetAddress);
    // await tx.wait();

    if (!isAlreadyWhitelisted) {
      console.log(`Address ${targetAddress} is already not whitelisted`);
    }
    // Remove address to whitelist
    console.log(`Removing ${targetAddress} to whitelist...`);
    const tx = await token.removeFromWhitelist(targetAddress);
    await tx.wait();
    
    // Verify whitelist status
    const isWhitelisted = await token.isWhitelisted(targetAddress);
    console.log(`Whitelist status for ${targetAddress}: ${isWhitelisted ? 'Whitelisted' : 'Not whitelisted'}`);

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