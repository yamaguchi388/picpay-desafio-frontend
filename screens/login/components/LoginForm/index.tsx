import { ReactElement } from "react";
import { Input, Label } from "../../../../core/components";
import { Form, H1, InputContainer, Section } from "./styles";
import Image from "next/image";
import logo from "../../../../assets/images/logo.svg";

export const LoginForm = ({ area }): ReactElement => {
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
      </Form>
    </Section>
  );
};
