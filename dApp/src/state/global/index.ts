import { createAction, createNextState, createSlice } from "@reduxjs/toolkit";
import { SupportConnectWalletTypeEnum } from "../../constants/chainList";
export const updateVersion = createAction<void>("global/updateVersion");
export interface GlobalState {
  type?: SupportConnectWalletTypeEnum;
}
const initialGlobalState: GlobalState = {};
export const globalSlice = createSlice({
  name: "global",
  initialState: initialGlobalState,
  reducers: {
    changeGlobalStateValue: (state, action) => {
      const { key, value } = action.payload;
      return createNextState(state, (draftState: any) => {
        draftState[key] = value;
      });
    },
  },
  extraReducers: (builder) => {},
});
export const { changeGlobalStateValue } = globalSlice.actions;
export default globalSlice.reducer;
