import { ethers } from "hardhat";
import { getNamedAccounts } from "hardhat";

async function main() {
  // Get command line arguments
  const myStrictTokenAddress = "0x00e080eC0a8F678cD25FC0410C9a8Cf69332a302";
  // The token we want to withdraw (this should be a token that exists in the contract's balance)
  const tokenToWithdrawAddress = "0xabEcAF090BB035A30383b4CD9D22919Cf64ffCe4";
  const amountToWithdraw = "200";

  try {
    // Get named accounts
    const { deployer } = await getNamedAccounts();
    // Get deployer signer (owner of the contract)
    const [deployerSigner] = await ethers.getSigners();
    
    // Get token contract instance with deployer (owner) signer
    const myStrictToken = await ethers.getContractAt("MyStrictToken", myStrictTokenAddress, deployerSigner);
    
    // Get token details
    const name = await myStrictToken.name();
    const symbol = await myStrictToken.symbol();
    
    console.log(`Token: ${name} (${symbol})`);
    console.log(`Owner/Deployer address: ${deployer}`);

    // Check if the contract has any balance of the token we want to withdraw
    const tokenToWithdraw = await ethers.getContractAt("IERC20", tokenToWithdrawAddress, deployerSigner);
    const contractBalance = await tokenToWithdraw.balanceOf(myStrictTokenAddress);
    
    console.log(`Contract balance of token to withdraw: ${ethers.formatEther(contractBalance)}`);
    
    if (contractBalance <= amountToWithdraw) {
      console.log(`Insufficient balance. Contract has ${contractBalance} tokens, but trying to withdraw ${amountToWithdraw}`);
      process.exit(1);
    }

    console.log(`Withdrawing ${amountToWithdraw} tokens from ${tokenToWithdrawAddress}...`);
    const tx = await myStrictToken.withdrawToken(tokenToWithdrawAddress, ethers.parseUnits(amountToWithdraw, 18));
    console.log(`Transaction hash: ${tx.hash}`);
    console.log(`Waiting for confirmation...`);
    
    const receipt = await tx.wait();
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
    console.log(`Withdrawal successful!`);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });