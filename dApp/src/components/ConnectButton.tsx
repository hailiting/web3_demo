import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
} from "@material-ui/core";
import { useCallback, useState } from "react";
import { getUserAddress } from "../utils/wallet";
import { useToastContext } from "../provider/toastProvider";
import { useAppDispatch } from "../state";
import { changeAccountStateValue } from "../state/account";
import useDebouncedCallback from "../hooks/useDebouncedCallback";
import { changeGlobalStateValue } from "../state/global";
import {
  SupportConnectWalletTypeEnum,
  supportConnectWalletType,
} from "../constants/chainList";

const ConnectButton = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastContext();
  const dispatch = useAppDispatch();
  const connectWallet = useDebouncedCallback(
    useCallback(
      async (targe: string) => {
        setLoading(true);
        const _targe = targe as SupportConnectWalletTypeEnum;
        try {
          const account: string | undefined = await getUserAddress(_targe);
          if (account) {
            console.log(`account=====${account}`);
            setLoading(false);
            dispatch(
              changeAccountStateValue({
                key: "accountAddress",
                value: account,
              })
            );
            dispatch(
              changeGlobalStateValue({
                key: "type",
                value: _targe,
              })
            );
          }
        } catch (error: any) {
          setLoading(false);
          const msg = error.message || `${error}`;
          showToast(msg);
        }
      },
      [dispatch, showToast]
    )
  );
  return (
    <>
      <Button color="primary" variant="contained" onClick={() => setOpen(true)}>
        Connect Wallet
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Fade}
      >
        <DialogTitle>Choose a wallet to connect</DialogTitle>
        <DialogContent
          onClick={(event) =>
            connectWallet((event.target as HTMLElement).innerText)
          }
        >
          {supportConnectWalletType.map((type) => (
            <Button
              variant="outlined"
              color="secondary"
              style={{ margin: "5px" }}
              key={type}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : null}
              {type}
            </Button>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ConnectButton;
