import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const accounts = await getNamedAccounts();
  const deployer = accounts.deployer || (await ethers.getSigners())[0].address;

  console.log("====================");
  console.log("Network:", hre.network.name);
  console.log("Deployer:", deployer);
  console.log("====================");

  const result = await deploy("MyNFT", {
    contract: "MyNFT",
    args: [],
    from: deployer,
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false,
  });

  console.log("MyNFT deployed to:", result.address);

  // Mint 1 NFT to deployer
  const myNFT = await ethers.getContractAt("MyNFT", result.address);
  const mintTx = await myNFT.mint(deployer);
  await mintTx.wait();
  console.log("Minted NFT #0 to:", deployer);

  // Check owner of token 0
  const owner = await myNFT.ownerOf(0);
  console.log("Owner of token #0:", owner);
};

func.tags = ["deploy"];
export default func;