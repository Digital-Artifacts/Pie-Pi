import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv"

dotenv.config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    areon: {
      url: `https://testnet-rpc.areon.network`,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    ganache: {
      url: `http://127.0.0.1:7545`,
    },
  },
  paths: {
    artifacts: "./artifacts",
  },
};

export default config;
