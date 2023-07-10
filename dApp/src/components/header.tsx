import { Box } from "@material-ui/core";
import WalletInfo from "./WalletInfo";
import ChainList from "./ChainList";

const Header = () => {
  return (
    <Box display="flex" justifyContent="end" alignItems="center">
      <ChainList />
      <Box marginRight="10px" />
      <WalletInfo />
    </Box>
  );
};

export default Header;
