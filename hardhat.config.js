require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      chainId: Number(process.env.TOPOS_CHAIN_ID),
      url: `${process.env.TOPOS_ENDPOINT}`,
      gasPrice: 2100000,
      accounts: [
        `${process.env.KEY1}`,
        `${process.env.KEY2}`
      ]
    }
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      },
      viaIR: true
    }
  }
};