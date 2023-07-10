import { Box, Button } from "@material-ui/core";
import { useAccountState } from "../state/account/hooks";
import ConnectButton from "./ConnectButton";
import { desensitization } from "../utils/desensitization";
import { useCallback } from "react";
import { disconnect } from "../utils/wallet";
import { useGlobalState } from "../state/global/hooks";
import { useAppDispatch } from "../state";
import { changeAccountStateValue } from "../state/account";

const WalletInfo = () => {
  const { accountAddress } = useAccountState();
  const { type } = useGlobalState();
  const dispatch = useAppDispatch();
  const disconnectHandle = useCallback(() => {
    disconnect(type);
    dispatch(
      changeAccountStateValue({
        key: "accountAddress",
        value: undefined,
      })
    );
  }, [type, dispatch]);
  return (
    <Box>
      {accountAddress ? (
        <Button color="primary" variant="contained" onClick={disconnectHandle}>
          {desensitization(accountAddress, 6)}
        </Button>
      ) : (
        <ConnectButton />
      )}
    </Box>
  );
};
export default WalletInfo;
