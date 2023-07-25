# web3_demo

编写一个同时在多个公链运行的 NFT marketplace Demo：

1、支持多个（sepolia、polygon）公链；
2、多个（metamask、coinbase wallet、walletConnect、移动端 metamask）钱包链接；
3、在 sepolia、polygon 公链实现、部署合约 marketplace、721nft 合约、使用自定义的代币进行购买；

## 编写前端界面

- 设计和构建一个用户友好的前端界面, 以便用户可以浏览和购买 NFT.
- 需要考虑与多个钱包集成和不同的公链交互

```sh
npx create-react-app dapp --template typescript
npm install @material-ui/core @emotion/react @emotion/styled

npm install web3 @types/web3 --save
npm install @walletconnect/web3-provider
# npm install @metamask/mobile
```

### 集成多个钱包

- 例如 METAMASK、Coinbase wallet、WalletConnect 和移动端 METAMASK 等。这需要您使用相应的 SDK 和 API 进行连接。

## 编写智能合约

- marketplace 合约可以用于购买和销售 NFT
- 721NFT 跨链合约定义了 NFT 的属性和行为
- 编写自定义代币合约，以便用户可以使用代币购买 NFT

### npm 开发智能合约

```sh
npm init -y
npm install solc
npm install truffle -g
npm install -g truffle@5.1.48
truffle init
npm install @openzeppelin/contracts
truffle compile # 编译
```

#### 使用具有跨链功能的智能合约框架

```sh
npm install --save web3 @openzeppelin/contracts @truffle/hdwallet-provider

# 编译
truffle compile
# truffle test --network goerli
# 合约部署
truffle migrate --network goerli
node deploy.js

truffle console --network goerli
# curl -o- https://gitee.com/mirrors/nvm/raw/v0.38.0/install.sh | bash
# This version of µWS is not compatible with your Node.js build:
# nvm install v18.12.1
# nvm use v18.12.1
# v18.12.1
```

部署和配置跨链桥
首先，您需要在以太坊和 Binance Smart Chain 上部署 TokenBridge 合约。TokenBridge 的部署和配置非常复杂，需要详细了解其工作原理和实现细节。我建议您查看 **TokenBridge 的官方文档**，以了解如何部署和配置 TokenBridge。

在部署和配置 TokenBridge 合约时，您需要指定支持跨链转移的 NFT 合约地址和其他参数。对于我们的示例项目，您需要指定以太坊上的 CrossChainNFT 合约地址和 Binance Smart Chain 上的 CrossChainNFTBSC 合约地址。您还需要指定其他参数，如桥接费用、最小转移金额等。

在 TokenBridge 合约部署和配置完成后，您可以在以太坊上的 CrossChainNFT 合约中调用 transferToBSC 函数，以将 NFT 跨链转移到 Binance Smart Chain 上。在 Binance Smart Chain 上的 CrossChainNFTBSC 合约中，您可以调用 transferFromETH 函数，以接收跨链转移的 NFT。

### 部署智能合约

- 将编写的智能合约部署到 sepolia 和 polygon 公链上。您需要使用钱包连接到相应的公链，使用智能合约编译器将合约代码转换为字节码，并将其部署到链上

## 测试和调试

One of your dependencies, babel-preset-react-app, is importing the
"@babel/plugin-proposal-private-property-in-object" package without
declaring it in its dependencies. This is currently working because
"@babel/plugin-proposal-private-property-in-object" is already in your
node_modules folder for unrelated reasons, but it may break at any time.

babel-preset-react-app
