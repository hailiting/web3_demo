import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, SnackbarContent } from "@material-ui/core";
import SuccessIcon from "./svg/success";
import WarningIcon from "./svg/warning";
import ErrorIcon from "./svg/error";
export type AlertType = "success" | "warning" | "error";

interface AlertProps {
  message: string;
  onClose: (event?: React.SyntheticEvent, reason?: string) => void;
  variant: AlertType;
  open: boolean;
}
const variantIcon = {
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};
function Alert(props: AlertProps) {
  const classes = useStyles();
  const { message, onClose, variant, open } = props;
  const Icon = variantIcon[variant];
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContent
        className={classes[variant]}
        message={
          <span className={classes.message}>
            <Icon />
            {message}
          </span>
        }
      />
    </Snackbar>
  );
}

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));
export interface ToastProps {
  message: string;
  variant: AlertType;
}
export default function Toast(props: ToastProps) {
  const { message, variant } = props;
  const [open, setOpen] = useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    if (message && message.trim() !== "") {
      setOpen(true);
    }
  }, [message]);
  return (
    <Alert
      message={message}
      onClose={handleClose}
      variant={variant as AlertType}
      open={open}
    />
  );
}
