import { ReactElement } from "react";
import { Button, Input, Label, Section } from "../../../../core/components";
import { Form, H1, InputContainer } from "./styles";
import Image from "next/image";
import logo from "../../../../assets/images/logo.svg";

type LoginFormProps = {
  area: string;
};

export const LoginForm = ({ area }: LoginFormProps): ReactElement => {
  return (
    <Section area={area}>
      <Form onSubmit={(event) => event.preventDefault()}>
        <Image src={logo} loading="lazy" alt="logo do picfriends" />
        <H1>Bem vindo de volta</H1>
        <InputContainer>
          <Label htmlFor="email" labelText="Email" />
          <Input type="email" name="email" id="email" />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="password" labelText="Senha" />
          <Input type="password" name="password" id="password" />
        </InputContainer>
        <Button type="submit" onClick={null}>
          ENTRAR
        </Button>
      </Form>
    </Section>
  );
};
