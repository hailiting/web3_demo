import { useSelector } from "react-redux";
import { GlobalState } from "..";
import { State } from "../../types";

export const useGlobalState = (): GlobalState => {
  const global = useSelector((state: State) => state.global);
  return global;
};
