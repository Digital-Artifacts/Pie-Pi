import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command line interface.

  // If this script is run directly using `node` you may want to compile manually to make sure everything is compiled manually
  const Pie = await ethers.getContractFactory("Pie");

  const [deployer] = await ethers.getSigners(); // Get the account deploying the contract

  const name = "PieToken";
  const symbol = "PIE";

  const pie = await Pie.deploy(name, symbol, deployer.address); // Use the deployer's address as the recipient

  await pie.waitForDeployment();

  console.log(`Pie deployed to ${pie.target}`);
  console.log(deployer.address)
}

// We recommend this pattern to be able to use async/await everywhere and properly handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
