import { ethers } from "hardhat";
import  utils from 'ethers';
import { getAddress } from "ethers";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command line interface.

  // If this script is run directly using `node` you may want to compile manually to make sure everything is compiled manually
  
  
  const pieTokenAddress = getAddress("0xAc8EE0e9a9582A961D0F8d89f3ffD7fC634D0187");
  
  const VideoPie = await ethers.getContractFactory("VideoPie");
  const videopie = await VideoPie.deploy(pieTokenAddress);

  await videopie.waitForDeployment();

  console.log(`Pie-pi deployed to ${videopie.target}`);
  console.log(pieTokenAddress)
}

  // We recommend this pattern to be able to use async/await everywhere and properly handle erros
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});