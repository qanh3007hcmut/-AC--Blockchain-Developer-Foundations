import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    "function mint(address to) external",
    "function ownerOf(uint256 tokenId) external view returns (address)",
    "function nextTokenId() external view returns (uint256)"
  ];
  const contractAddress = "0x41d0Ad4E6227062B59CA673B418Fc00E3A2d10Cf"; // Replace with your contract address
  const contract = new ethers.Contract(contractAddress, abi, provider);

  /**
   * Check owner of token 0
   */
  try {
    const owner = await contract.ownerOf(0);
    console.log("Owner of token #0:", owner);
  } catch (error: any) {
    console.log("Token #0 not found or error:", error.message);
  }
}

main().catch(console.error);
