import Image from "next/image";
import { ReactElement } from "react";
import { Container, ToggleButton, Button } from "./styles";
import logo from "../../assets/images/logo-transparent.svg";

import { Avatar, Popover, Typography } from "@mui/material";
import { useProtectedHeader } from "./useProtectedHeader";

export const ProtectedHeader = (): ReactElement => {
  const { state, handlers } = useProtectedHeader();

  return (
    <Container>
      <Image loading="lazy" src={logo} alt="logomarca da empresa picfriends" />
      <ToggleButton onClick={handlers.handleClick} aria-describedby={state.id}>
        <Avatar
          src="../../assets/images/avatar.png"
          alt="Avatar de usuário logado"
        />
      </ToggleButton>
      <Popover
        id={state.id}
        open={state.open}
        anchorEl={state.anchorEl}
        onClose={handlers.handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Button onClick={handlers.handleLogout}>
          <Typography sx={{ p: 2 }}>Logout</Typography>
        </Button>
      </Popover>
    </Container>
  );
};
