import { useSelector } from "react-redux";
import { Account } from "..";
import { State } from "../../types";

export const useAccountState = (): Account => {
  const account = useSelector((state: State) => state.account);
  return account;
};
