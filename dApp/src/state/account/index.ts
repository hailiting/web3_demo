import { createSlice, createNextState } from "@reduxjs/toolkit";
import { fetchGetChainId, fetchGetUserAddress } from "./actions";

export interface Account {
  accountAddress: string;
  chainId?: number;
}
const initAccount: Account = {
  accountAddress: "",
};
export const accountSlice = createSlice({
  name: "account",
  initialState: initAccount,
  reducers: {
    changeAccountStateValue: (state, action) => {
      const { key, value } = action.payload;
      return createNextState(state, (draftState: any) => {
        draftState[key] = value;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetChainId.fulfilled, (state: Account, action) => {
      if (action.payload) {
        state.chainId = action.payload;
      }
    });
    builder.addCase(fetchGetUserAddress.fulfilled, (state: Account, action) => {
      if (action.payload) {
        state.accountAddress = action.payload;
      }
    });
  },
});
export const { changeAccountStateValue } = accountSlice.actions;
export default accountSlice.reducer;
