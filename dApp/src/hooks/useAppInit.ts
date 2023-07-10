import { useEffect } from "react";
import { useAppDispatch } from "../state";
import { fetchGetChainId, fetchGetUserAddress } from "../state/account/actions";
import { useGlobalState } from "../state/global/hooks";

const useAppInit = () => {
  const dispatch = useAppDispatch();
  const { type } = useGlobalState();
  useEffect(() => {
    dispatch(fetchGetChainId({ type }));
    dispatch(fetchGetUserAddress({ type }));
  }, [type, dispatch]);
};

export default useAppInit;
