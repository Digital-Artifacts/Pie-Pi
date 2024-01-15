import { ethers } from "hardhat";

// We require the Hardhat runtime environment explicity above. This is optional but useful for running the script in a standalone fashion through `node <script>`

// When running the script with `npx hardhat run <script>` you'll find the Hardhat Runtime Environment's members available in the global scope.

async function main() {
  // Hardhat always runs the compile task when running scripts with its command line interface.

  // If this script is run directly using `node` you may want to compile manually to make sure everything is compiled manually
  const VideoPie = await ethers.getContractFactory("VideoPie");
  const videopie = await VideoPie.deploy();

  await videopie.waitForDeployment();

  console.log(`Youtube deployed to ${videopie.target}`);
}

  // We recommend this pattern to be able to use async/await everywhere and properly handle erros
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});