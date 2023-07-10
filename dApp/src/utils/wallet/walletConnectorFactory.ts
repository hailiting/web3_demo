import {
  ChainItem,
  SupportConnectWalletTypeEnum,
  supportConnectWalletType,
} from "../../constants/chainList";
import { ConnectWallet } from "./walletType/connectWallet";

export interface WalletConnector {
  getUserAddress(): Promise<string | undefined>;
  getChainId(): Promise<number | undefined>;
  switchChain(chainId: number): Promise<void>;
  disconnect(): Promise<void>;
  addChain(chain: ChainItem): Promise<boolean | undefined>;
  sendNftTransaction(
    contractAddress: string,
    abi: any[],
    tokenId: string,
    price: string,
    recipient: string
  ): Promise<void>;
  mintNFT(contractAddress: string, to: string, nftURI: string): Promise<void>;
  transferToBSC(
    contractAddress: string,
    abi: any[],
    tokenId: number,
    recipient: string
  ): Promise<void>;
  transferFromETH(
    contractAddress: string,
    abi: any[],
    tokenId: number
  ): Promise<void>;
}

export function createWalletConnector(
  wallatType: SupportConnectWalletTypeEnum,
  infuraId: string
): WalletConnector {
  if (supportConnectWalletType.includes(wallatType)) {
    return new ConnectWallet(infuraId);
  }
  throw new Error(`Unsupported wallet type: ${wallatType}`);
}
