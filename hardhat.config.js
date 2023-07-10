require("@nomicfoundation/hardhat-toolbox");

require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ethers");
// require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const dotenv = require('dotenv');
dotenv.config();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // solidity: "0.8.2",
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks:{
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      // gasPrice: 20000000000,
      accounts: [PRIVATE_KEY]
    },
    bscmainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      // gasPrice: 20000000000,
      accounts: [PRIVATE_KEY]
    },
    arbtestnet: {
      // url: "https://endpoints.omniatech.io/v1/arbitrum/goerli/public",
      url: "https://arbitrum.getblock.io/6953f208-0b17-4726-b990-e898ead7cd70/goerli/",
      chainId: 421613,
      accounts: [PRIVATE_KEY]
    },
    arb: {
      url: "https://arb1.arbitrum.io/rpc",
      chainId: 42161,
      // gasPrice: 20000000000,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};


// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
// };
