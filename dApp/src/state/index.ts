import { configureStore } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import account from "./account";
import global, { updateVersion } from "./global";
import { useDispatch } from "react-redux";
const PERSISTED_KEYS: string[] = ["global"];
const version = "v0.01";
const store = configureStore({
  reducer: {
    global,
    account,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(
      save({ states: PERSISTED_KEYS, namespace: version })
    ),

  preloadedState: load({ states: PERSISTED_KEYS, namespace: version }),
});
store.dispatch(updateVersion());
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
