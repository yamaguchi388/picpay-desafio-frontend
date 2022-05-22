import { Snackbar, Alert } from "@mui/material";
import { memo, ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { IToast } from "../../models";

interface IToastProps {
  toasts: IToast[];
}

export const Toast = ({ type, message }: IToast) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!!message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (_?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

const ToastContainer = ({ toasts }: IToastProps): ReactElement => (
  <>
    {toasts.map((toast) => (
      <Toast key={toast.id} type={toast.type} message={toast.message} />
    ))}
  </>
);

export default memo(ToastContainer);
