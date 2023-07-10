import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { WalletConnector } from "../walletConnectorFactory";
import { ChainItem } from "../../../constants/chainList";
import contractInfo from "./abi/CrossChainNFT";

export class ConnectWallet implements WalletConnector {
  private web3: Web3 | undefined;

  constructor(private infuraId: string) {
    this.getWeb3(infuraId);
  }

  async getWeb3(infuraId: string): Promise<void> {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      const provider = new WalletConnectProvider({
        infuraId: infuraId,
      });
      provider.on("chainChanged", (chainId: number) => {
        window.location.reload();
      });
      provider.on("accountsChanged", (accounts: string[]) => {
        window.location.reload();
      });
      this.web3 = new Web3(provider);
    }
  }

  async disconnect(): Promise<void> {
    if (this.web3) {
      const provider = this.web3
        .currentProvider as unknown as WalletConnectProvider;
      if (provider instanceof WalletConnectProvider) {
        await provider.disconnect();
      }
      this.web3 = undefined;
    }
  }

  async getUserAddress(): Promise<string | undefined> {
    const accounts = await this.web3?.eth.getAccounts();
    return accounts?.[0];
  }

  async getChainId(): Promise<number | undefined> {
    const chainId = await this.web3?.eth.getChainId();
    return Number(chainId);
  }

  async switchChain(chainId: number): Promise<void> {
    try {
      const provider = this.getProvider();
      const _chainId = this.toHex(chainId);
      await provider.send("wallet_switchEthereumChain", [
        { chainId: _chainId },
      ]);
      window.location.reload();
    } catch (err) {
      throw err;
    }
  }

  async addChain(chain: ChainItem): Promise<boolean> {
    try {
      const provider = this.getProvider();
      const _chainId = this.toHex(chain.chainId);
      const _chain = {
        ...chain,
        chainId: _chainId,
      };
      const result = await provider.send("wallet_addEthereumChain", [_chain]);
      return result;
    } catch (err) {
      throw err;
    }
  }
  async sendNftTransaction(
    contractAddress: string,
    abi: any[],
    tokenId: string,
    price: string,
    recipient: string
  ): Promise<void> {
    if (!this.web3) {
      return;
    }
    const contract = new this.web3.eth.Contract(abi, contractAddress);
    const fromAddress = await this.getUserAddress();
    if (!fromAddress) {
      throw new Error("Failed to get user address");
    }
    const approvedAddress = recipient; // 授权给接收者地址
    await (contract.methods as any).approve(approvedAddress, tokenId).send({
      from: fromAddress,
    });
    const transaction = (contract.methods as any).transferFrom(
      fromAddress,
      recipient,
      tokenId
    );
    const gas = await transaction.estimateGas({
      from: approvedAddress, // 使用被授权的地址发送交易
      value: price,
    });
    await transaction.send({
      from: approvedAddress,
      to: contractAddress,
      value: price,
      gas: gas.toString(),
    });
  }

  async mintNFT(
    contractAddress: string,
    to: string,
    nftURI: string
  ): Promise<void> {
    if (!this.web3) {
      return;
    }
    const contract = new this.web3.eth.Contract(
      contractInfo.abi,
      contractAddress
    );
    const fromAddress = await this.getUserAddress();
    if (!fromAddress) {
      throw new Error("Failed to get user address");
    }
    const transaction = (contract.methods as any).mintNFT(to, nftURI);
    // myContract.methods['myMethod(uint256)'](123)
    const gas = await transaction.estimateGas({ from: fromAddress });
    await transaction.send({ from: fromAddress, gas: gas.toString() });
  }

  async transferToBSC(
    contractAddress: string,
    abi: any[],
    tokenId: number,
    recipient: string
  ): Promise<void> {
    if (!this.web3) {
      return;
    }
    const contract = new this.web3.eth.Contract(abi, contractAddress);
    const fromAddress = await this.getUserAddress();
    if (!fromAddress) {
      throw new Error("Failed to get user address");
    }
    const transaction = (contract.methods as any).transferToBSC(
      tokenId,
      recipient
    );
    const gas = await transaction.estimateGas({ from: fromAddress });
    await transaction.send({ from: fromAddress, gas: gas.toString() });
  }

  async transferFromETH(
    contractAddress: string,
    abi: any[],
    tokenId: number
  ): Promise<void> {
    if (!this.web3) {
      return;
    }
    const contract = new this.web3.eth.Contract(abi, contractAddress);
    const fromAddress = await this.getUserAddress();
    if (!fromAddress) {
      throw new Error("Failed to get user address");
    }
    const transaction = (contract.methods as any).transferFromETH(tokenId);
    const gas = await transaction.estimateGas({ from: fromAddress });
    await transaction.send({ from: fromAddress, gas: gas.toString() });
  }

  private getProvider(): WalletConnectProvider {
    if (!(this.web3?.currentProvider instanceof WalletConnectProvider)) {
      throw new Error("WalletConnectProvider not found");
    }
    return this.web3.currentProvider as WalletConnectProvider;
  }

  private toHex(value: number): string {
    return Web3.utils.toHex(value);
  }
}
