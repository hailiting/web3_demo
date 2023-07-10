require("dotenv").config();
const { privateKey, infuraKey } = process.env;
const NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker");
const HDWalletProvider = require("truffle-hdwallet-provider");
const privateKeys = [privateKey];
const web3Provider = infuraKey;

module.exports = {
  plugins: ["truffle-security"],
  networks: {
    goerli: {
      provider: function () {
        const wallet = new HDWalletProvider(
          privateKeys,
          web3Provider,
          0,
          privateKeys.length
        );
        // wallet.setProviderIndex(1);
        // console.log("Current account address:", wallet.getAddress());
        const nonceTracker = new NonceTrackerSubprovider();
        wallet.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(wallet.engine);
        return wallet;
      },
      network_id: 5, // Goerli network ID
      gas: 6000000,
      gasPrice: "10000000000", // 10 Gwei
      networkCheckTimeout: 60000,
      skipDryRun: true,
    },
    polygon: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: privateKey,
          providerOrUrl: `https://polygon-mainnet.infura.io/v3/${infuraKey}`,
        }),
      network_id: 137,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  paths: {
    "@openzeppelin/contracts": "./node_modules/@openzeppelin/contracts",
  },
  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.20", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 200,
      },
      //  evmVersion: "byzantium"
      // }
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};
