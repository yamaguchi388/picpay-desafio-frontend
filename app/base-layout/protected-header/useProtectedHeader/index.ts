import router from "next/router";
import { MouseEvent, useState } from "react";

export const useProtectedHeader = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const id = open ? "profile" : undefined;
  return {
    state: { anchorEl, id, open },
    handlers: { handleClick, handleLogout, handleClose },
  };
};
