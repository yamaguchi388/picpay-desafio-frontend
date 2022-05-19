import { ReactElement } from "react";
import { Button, Input, Section } from "../../../../core/components";
import { Form } from "./styles";
import Image from "next/image";
import logo from "../../../../assets/images/logo.svg";
import { LoginFormProps } from "./types";
import { Typography } from "@mui/material";

export const LoginForm = ({ area }: LoginFormProps): ReactElement => {
  return (
    <Section area={area} hasBackground>
      <Form onSubmit={(event) => event.preventDefault()}>
        <Image src={logo} loading="lazy" alt="logo do picfriends" />
        <Typography variant="h5" component="h1">
          Bem vindo de volta
        </Typography>
        <Input
          type="email"
          variant="outlined"
          label="Email"
          name="email"
          id="email"
        />
        <Input
          type="password"
          variant="outlined"
          label="Senha"
          name="password"
          id="password"
        />
        <Button type="submit" onClick={() => null}>
          ENTRAR
        </Button>
      </Form>
    </Section>
  );
};
