import { Account } from "./account";
import { GlobalState } from "./global";

export interface State {
  account: Account;
  global: GlobalState;
}
