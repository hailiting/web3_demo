import {
  ChainId,
  ChainItem,
  SupportConnectWalletTypeEnum,
  SupportedChainKeys,
  chainList,
} from "../../constants/chainList";
import {
  WalletConnector,
  createWalletConnector,
} from "./walletConnectorFactory";
async function getWalletInfo(
  walletType = SupportConnectWalletTypeEnum.METAMASK
): Promise<WalletConnector> {
  const walletInfo = createWalletConnector(walletType, "sass");
  if (!walletInfo) {
    throw new Error(`Unsupported wallet type: ${walletType}`);
  }
  return walletInfo;
}

export async function getUserAddress(
  walletType?: SupportConnectWalletTypeEnum
): Promise<string | undefined> {
  try {
    const walletInfo = await getWalletInfo(walletType);
    return await walletInfo.getUserAddress();
  } catch (error) {
    console.error("getAccounts Failed:", error);
    throw error;
  }
}

export async function getChainId(
  walletType?: SupportConnectWalletTypeEnum
): Promise<number | undefined> {
  try {
    const walletInfo = await getWalletInfo(walletType);
    return await walletInfo.getChainId();
  } catch (error) {
    console.error("getChainId Failed:", error);
    throw error;
  }
}

export async function setupNetWork(
  chainName: SupportedChainKeys,
  walletType?: SupportConnectWalletTypeEnum
) {
  const chainId = ChainId[chainName];
  if (chainId) {
    try {
      const walletInfo = await getWalletInfo(walletType);
      await walletInfo.switchChain(chainId);
      console.log(1);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        console.log(2);
        try {
          const chain = chainList[chainName];
          await addChain(chain, walletType);
        } catch (addChainError) {
          console.error("addChainError Failed:", addChainError);
          throw addChainError;
        }
      }
      console.error("setupNetWork Failed:", switchError);
      throw switchError;
    }
  } else {
    throw new Error(`Not found chainName: ${chainName} chainId: ${chainId}`);
  }
}

export async function addChain(
  chain: ChainItem,
  walletType?: SupportConnectWalletTypeEnum
): Promise<boolean | undefined> {
  try {
    const walletInfo = await getWalletInfo(walletType);
    return await walletInfo.addChain(chain);
  } catch (err) {
    throw err;
  }
}
export async function disconnect(
  walletType?: SupportConnectWalletTypeEnum
): Promise<void> {
  try {
    const walletInfo = await getWalletInfo(walletType);
    await walletInfo.disconnect();
  } catch (err) {
    throw err;
  }
}

export async function mintNFT(
  contractAddress: string,
  to: string,
  nftURI: string,
  walletType?: SupportConnectWalletTypeEnum
): Promise<void> {
  try {
    const walletInfo = await getWalletInfo(walletType);
    await walletInfo.mintNFT(contractAddress, to, nftURI);
  } catch (err) {
    throw err;
  }
}
