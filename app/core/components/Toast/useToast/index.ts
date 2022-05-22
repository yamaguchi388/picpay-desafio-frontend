import { SyntheticEvent, useEffect, useState } from "react";

export const useToast = (message: string) => {
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
  return { state: { open }, handlers: { handleClose } };
};
