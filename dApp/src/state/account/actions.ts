import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChainId, getUserAddress } from "../../utils/wallet";
import { SupportConnectWalletTypeEnum } from "../../constants/chainList";

export const fetchGetChainId = createAsyncThunk<
  number | undefined,
  { type?: SupportConnectWalletTypeEnum }
>("account/fetchGetChainId", async ({ type }) => {
  const chainId = await getChainId(type);
  console.log({ chainId });
  return chainId;
});

export const fetchGetUserAddress = createAsyncThunk<
  string | undefined,
  { type?: SupportConnectWalletTypeEnum }
>("account/fetchGetUserAddress", async ({ type }) => {
  const address = await getUserAddress(type);
  return address;
});
