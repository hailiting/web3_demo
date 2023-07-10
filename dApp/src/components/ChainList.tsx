import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Theme,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useCallback, useMemo, useState } from "react";
import { useAccountState } from "../state/account/hooks";
import {
  ChainId,
  SupportedChainIdList,
  SupportedChainKeys,
  getChainNameById,
} from "../constants/chainList";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import useDebouncedCallback from "../hooks/useDebouncedCallback";
import { setupNetWork } from "../utils/wallet";
import { useToastContext } from "../provider/toastProvider";

const ChainList = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const { chainId } = useAccountState();
  const [loading, setLoading] = useState(false);
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);
  const { showToast } = useToastContext();
  const chainName = useMemo(() => {
    return capitalizeFirstLetter(getChainNameById(chainId));
  }, [chainId]);
  const changeChain = useDebouncedCallback(
    useCallback(
      async (chainName: string) => {
        const _chainName = chainName as SupportedChainKeys;
        const _chainId = ChainId[_chainName];
        if (_chainId === chainId) {
          setModalOpen(false);
          return;
        }
        try {
          setLoading(true);
          await setupNetWork(_chainName);
          setModalOpen(false);
        } catch (error: any) {
          setLoading(false);
          const msg = error.message || `${error}`;
          showToast(msg);
        }
      },
      [showToast, chainId]
    )
  );
  return (
    <div className={classes.root}>
      <Box
        display="flex"
        alignItems="center"
        style={{
          backgroundColor: "#eee",
          padding: "4px 5px",
          borderRadius: "4px",
        }}
        onClick={() => setModalOpen(true)}
      >
        {loading ? <CircularProgress size={24} /> : null}
        <img
          className={classes.logo}
          style={{ marginRight: chainName ? "5px" : "0" }}
          src={`/images/chains/${(chainName || "undefined").toLowerCase()}.png`}
          alt={chainName}
        />
        <Typography variant="subtitle1" color="primary">
          {chainName}
        </Typography>
      </Box>
      <Modal
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
      >
        <div className={classes.paper}>
          <Typography variant="h6" color="primary">
            Select Chain
          </Typography>
          <Box
            onClick={(event) =>
              changeChain((event.target as HTMLElement).innerText)
            }
          >
            {SupportedChainIdList.map((chain) => (
              <Button
                color="primary"
                variant="outlined"
                key={chain}
                style={{ marginRight: "5px", marginTop: "15px" }}
              >
                {chain}
              </Button>
            ))}
          </Box>
          <Box display="flex" justifyContent="end" marginTop="20px">
            <Button
              color="primary"
              variant="contained"
              onClick={handleModalClose}
            >
              Cancel
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    cursor: "pointer",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default ChainList;
