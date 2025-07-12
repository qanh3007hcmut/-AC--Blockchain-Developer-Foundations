import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function decimals() view returns (uint8)"
  ];
  const contractAddress = "0x41d0Ad4E6227062B59CA673B418Fc00E3A2d10Cf"; // Replace with your contract address
  const deployerAddress = "YOUR_DEPLOYER_ADDRESS"; // Replace with deployer address
  
  const contract = new ethers.Contract(contractAddress, abi, provider);

  // Get token info
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const decimals = await contract.decimals();
  const balance = await contract.balanceOf(deployerAddress);

  console.log("Token Name:", name);
  console.log("Token Symbol:", symbol);
  console.log("Total Supply:", ethers.formatUnits(totalSupply, decimals));
  console.log("Deployer Balance:", ethers.formatUnits(balance, decimals));
}

main().catch(console.error);
