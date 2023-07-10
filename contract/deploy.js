const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { abi, bytecode } = require("./build/contracts/MyNFT.json");
require("dotenv").config();
const { privateKey, infuraKey } = process.env;

const provider = new HDWalletProvider(
  privateKey,
  `https://goerli.infura.io/v3/${infuraKey}`
);

const web3 = new Web3(provider);
(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Deploying from:", accounts[0]);
  const result = await contract
    .deploy({
      data: bytecode,
      arguments: [],
    })
    .send({
      from: accounts[0],
      gas: 6000000,
      gasPrice: "10000000000",
    });

  console.log("Contract deployed to:", result.options.address);
})();
