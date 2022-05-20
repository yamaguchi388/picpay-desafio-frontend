import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MaterialModal from "@mui/material/Modal";

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

export const Modal = ({ open, handleClose, children }) => {
  return (
    <MaterialModal
      keepMounted
      disablePortal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </MaterialModal>
  );
};
