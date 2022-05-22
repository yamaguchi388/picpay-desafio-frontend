import * as React from "react";
import Box from "@mui/material/Box";
import { ReactElement } from "react";
import MaterialModal from "@mui/material/Modal";
import { IModalProps } from "./types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  borderRadius: "3px",
  boxShadow: 24,
  p: "2.5rem",
};

export const Modal = ({
  open,
  onClose,
  children,
}: IModalProps): ReactElement => {
  return (
    <MaterialModal
      keepMounted
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>{children}</Box>
    </MaterialModal>
  );
};