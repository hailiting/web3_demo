import { desensitization } from "../utils/desensitization";

export enum CHAINNAME {
  ETH_MAINNET = "ETH",
  ETH_ROPSTEN = "ETH_ROPSTEN",
  Ontology = "Ontology",
  ETH_RINKEBY = "ETH_RINKEBY",
  SEPOLIA = "SEPOLIA",
  POLYGONZKEVMTESTNET = "POLYGONZKEVMTESTNET",
  OPTIMISTIC_MAINNET = "OPTIMISM",
  BSC_MAINNET = "BSC",
  Celo_MAINNET = "Celo",
  OEC_MAINNET = "OEC",
  MoonbaseAlpha_MAINNET = "MoonbaseAlpha",
  Clover_Mainnet = "Clover",
  OPTIMISTIC_TESTNET = "OPTIMISTIC_TESTNET",
  ASTR_TESTNET = "ASTR_TESTNET",
  SDN_TESTNET = "SDN_TESTNET",
  BSC_TESTNET = "BSC_TESTNET",
  XDAI_MAIN = "XDAI_MAIN",
  HECO_MAINNET = "HECO",
  POLYGON_MAINNET = "POLYGON",
  FANTOM_MAINNET = "FANTOM",
  BOBA_MAINNET = "BOBA",
  SHIDEN_MAINNET = "SHIDEN",
  THETA_MAINNET = "THETA",
  THETA_TESTNET = "THETA_TESTNET",
  ASTR_MAINNET = "ASTR",
  FANTOM_TESTNET = "FANTOM_TESTNET",
  ARBITRUM_MAINNET = "ARBITRUM",
  ARBITRUM_TESTNET = "ARBITRUM_TESTNET",
  POLYGON_TESTNET = "POLYGON_TESTNET",
  AVALANCH_MAINNET = "AVALANCH",
  AVALANCH_TESTNET = "AVALANCH_TESTNET",
}
// 通过 Name 获取到 id
export const ChainId: Record<CHAINNAME, number> = {
  [CHAINNAME.ETH_MAINNET]: 1,
  [CHAINNAME.ETH_ROPSTEN]: 3,
  [CHAINNAME.Ontology]: 5851,
  [CHAINNAME.ETH_RINKEBY]: 4,
  [CHAINNAME.SEPOLIA]: 11155111,
  [CHAINNAME.POLYGONZKEVMTESTNET]: 1442,
  [CHAINNAME.OPTIMISTIC_MAINNET]: 10,
  [CHAINNAME.BSC_MAINNET]: 56,
  [CHAINNAME.Celo_MAINNET]: 42220,
  [CHAINNAME.OEC_MAINNET]: 66,
  [CHAINNAME.MoonbaseAlpha_MAINNET]: 1287,
  [CHAINNAME.Clover_Mainnet]: 1024,
  [CHAINNAME.OPTIMISTIC_TESTNET]: 69,
  [CHAINNAME.ASTR_TESTNET]: 81,
  [CHAINNAME.SDN_TESTNET]: 82,
  [CHAINNAME.BSC_TESTNET]: 87,
  [CHAINNAME.XDAI_MAIN]: 100,
  [CHAINNAME.HECO_MAINNET]: 128,
  [CHAINNAME.POLYGON_MAINNET]: 137,
  [CHAINNAME.FANTOM_MAINNET]: 250,
  [CHAINNAME.BOBA_MAINNET]: 288,
  [CHAINNAME.SHIDEN_MAINNET]: 336,
  [CHAINNAME.THETA_MAINNET]: 361,
  [CHAINNAME.THETA_TESTNET]: 365,
  [CHAINNAME.ASTR_MAINNET]: 592,
  [CHAINNAME.FANTOM_TESTNET]: 4002,
  [CHAINNAME.ARBITRUM_MAINNET]: 42161,
  [CHAINNAME.ARBITRUM_TESTNET]: 421611,
  [CHAINNAME.POLYGON_TESTNET]: 80001,
  [CHAINNAME.AVALANCH_MAINNET]: 43114,
  [CHAINNAME.AVALANCH_TESTNET]: 43113,
};
// 通过id 获取 Name
export function getChainNameById(chainId?: number): CHAINNAME | undefined {
  if (!chainId) {
    return undefined;
  }
  return Object.entries(ChainId).find(([, id]) => id === chainId)?.[0] as
    | CHAINNAME
    | undefined;
}

// 支持的链
export type SupportedChainKeys = keyof Pick<
  typeof CHAINNAME,
  CHAINNAME.SEPOLIA | CHAINNAME.POLYGONZKEVMTESTNET
>;
export const SupportedChainIdList: SupportedChainKeys[] = [
  CHAINNAME.SEPOLIA,
  CHAINNAME.POLYGONZKEVMTESTNET,
];

export type ChainItem = {
  chainId: number;
  blockExplorerUrls: string[];
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  iconUrls: string[];
  rpcUrls: string[];
};
type ChainStringList = Record<SupportedChainKeys, string[]>;
const blockExplorerUrls: ChainStringList = {
  [CHAINNAME.SEPOLIA]: ["https://sepolia.etherscan.io"],
  [CHAINNAME.POLYGONZKEVMTESTNET]: ["https://explorer.public.zkevm-test.net"],
};
const rpcUrls: ChainStringList = {
  [CHAINNAME.SEPOLIA]: ["https://eth-sepolia.g.alchemy.com/v2/demo"],
  [CHAINNAME.POLYGONZKEVMTESTNET]: ["https://rpc.public.zkevm-test.net"],
};
const iconUrls: ChainStringList = {
  [CHAINNAME.SEPOLIA]: [
    "https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg",
  ],
  [CHAINNAME.POLYGONZKEVMTESTNET]: [
    "https://icons.llamao.fi/icons/chains/rsz_polygon.jpg",
  ],
};
type ChainListType = Record<SupportedChainKeys, ChainItem>;
export const chainList: ChainListType = Object.fromEntries(
  SupportedChainIdList.map((chainName) => [
    chainName,
    {
      chainId: ChainId[chainName],
      blockExplorerUrls: blockExplorerUrls[chainName],
      chainName: desensitization(chainName),
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      iconUrls: iconUrls[chainName],
      rpcUrls: rpcUrls[chainName],
    },
  ])
) as unknown as ChainListType;

// 支持连接钱包的类型
export enum SupportConnectWalletTypeEnum {
  METAMASK = "METAMASK",
  METAMASKMobile = "METAMASKMobile",
  CoinbaseWallet = "CoinbaseWallet",
  WalletConnect = "WalletConnect",
}
export const supportConnectWalletType: string[] = Object.values(
  SupportConnectWalletTypeEnum
).map((v) => v.toUpperCase());
