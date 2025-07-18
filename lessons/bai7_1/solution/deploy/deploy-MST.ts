import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying MyStrictToken with account:", deployer);

  // Deploy the contract
  const token = await deploy("MyStrictToken", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log("MyStrictToken deployed to:", token.address);

  // Get contract instance
  const tokenContract = await ethers.getContractAt("MyStrictToken", token.address);

  // Mint 1000 tokens to deployer (with 18 decimals)
  const mintAmount = ethers.parseEther("1000");
  await tokenContract.mint(deployer, mintAmount);
  console.log(`Minted ${ethers.formatEther(mintAmount)} tokens to ${deployer}`);

  // Get and display balance
  const balance = await tokenContract.balanceOf(deployer);
  console.log(`Deployer balance: ${ethers.formatEther(balance)} tokens`);
};

export default deploy;
deploy.tags = ["deploy"];