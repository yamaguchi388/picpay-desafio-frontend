import { Snackbar, Alert } from "@mui/material";
import { memo, ReactElement } from "react";
import { IToast } from "../../models";
import { IToastProps } from "./types";
import { useToast } from "./useToast";

export const Toast = ({ type, message }: IToast) => {
  const { state, handlers } = useToast(message as string);

  return (
    <Snackbar
      open={state.open}
      autoHideDuration={5000}
      onClose={handlers.handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handlers.handleClose} severity={type} variant="filled">
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
