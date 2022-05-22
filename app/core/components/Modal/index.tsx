import * as React from "react";
import Box from "@mui/material/Box";
import { ReactElement } from "react";
import MaterialModal from "@mui/material/Modal";
import { IModalProps } from "./types";
import { style } from "./styles";

export const Modal = (props: IModalProps): ReactElement => {
  const { open, onClose, children, width } = props;
  return (
    <MaterialModal
      keepMounted
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style(width)}>{children}</Box>
    </MaterialModal>
  );
};
