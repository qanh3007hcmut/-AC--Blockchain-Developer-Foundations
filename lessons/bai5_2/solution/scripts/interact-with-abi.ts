import { ethers } from "ethers";
import hre from "hardhat";

const COUNTER_ABI = [
  "function increment() public",
  "function getCount() public view returns (uint256)",
  "function count() public view returns (uint256)"
];

async function main() {
  // Deploy contract trước
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment();
  const contractAddress = await counter.getAddress();
  
  console.log("Counter deployed to:", contractAddress);
  
  // Sử dụng ABI để tương tác
  const [signer] = await hre.ethers.getSigners();
  const contract = new ethers.Contract(contractAddress, COUNTER_ABI, signer);
  
  // Gọi increment()
  const tx = await contract.increment();
  await tx.wait();
  console.log("increment() called via ABI");
  
  // Gọi getCount()
  const count = await contract.getCount();
  console.log("Current count:", count.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});