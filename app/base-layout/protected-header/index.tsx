import Image from "next/image";
import { ReactElement, useState, MouseEvent } from "react";
import router from "next/router";
import { Container, ToggleButton, Button } from "./styles";
import logo from "../../assets/images/logo-transparent.svg";

import { Avatar, Popover, Typography } from "@mui/material";

export const ProtectedHeader = (): ReactElement => {
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
  return (
    <Container>
      <Image loading="lazy" src={logo} alt="logomarca da empresa picfriends" />
      <ToggleButton onClick={handleClick} aria-describedby={id}>
        <Avatar
          src="../../assets/images/avatar.png"
          alt="Avatar de usuário logado"
        />
      </ToggleButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Button onClick={handleLogout}>
          <Typography sx={{ p: 2 }}>Logout</Typography>
        </Button>
      </Popover>
    </Container>
  );
};
