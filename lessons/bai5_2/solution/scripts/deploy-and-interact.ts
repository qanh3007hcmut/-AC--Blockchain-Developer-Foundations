import hre from "hardhat";

async function main() {
  // Deploy Counter contract
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment();
  
  console.log("Counter deployed to:", await counter.getAddress());
  
  // Gọi hàm increment()
  const tx = await counter.increment();
  await tx.wait();
  console.log("increment() called");
  
  // In kết quả của getCount()
  const count = await counter.getCount();
  console.log("Current count:", count.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});