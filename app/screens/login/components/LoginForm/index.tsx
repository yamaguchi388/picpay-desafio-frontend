import { ReactElement } from "react";
import { Button, Input, Section } from "../../../../core/components";
import { ButtonContainer, Form } from "./styles";
import Image from "next/image";
import logo from "../../../../assets/images/logo.svg";
import { ILoginForm, LoginFormProps } from "./types";
import { FormHelperText, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginFormEnum } from "../../enums";
import { useLoginForm } from "../../hooks";

export const LoginForm = ({ area }: LoginFormProps): ReactElement => {
  const { formState, handleSubmit, control } = useForm<ILoginForm>({
    mode: "onSubmit",
  });

  const { rules, state, handlers } = useLoginForm();

  return (
    <Section area={area} hasBackground>
      <Form onSubmit={handleSubmit(handlers.fetchAuthenticate)} noValidate>
        <>
          <Image src={logo} loading="lazy" alt="logo do picfriends" />
          <Typography variant="h5" component="h1">
            Bem vindo de volta
          </Typography>
          <Input<ILoginForm>
            control={control}
            rules={rules.rulesEmail}
            type={LoginFormEnum.Email}
            variant="outlined"
            label="Email"
            name={LoginFormEnum.Email}
            id={LoginFormEnum.Email}
            error={!!formState.errors?.email}
            helperText={formState.errors?.email?.message}
          />
          <Input<ILoginForm>
            control={control}
            rules={rules.rulesPassword}
            type="password"
            variant="outlined"
            label="Senha"
            name={LoginFormEnum.Password}
            id={LoginFormEnum.Password}
            error={!!formState.errors?.password}
            helperText={formState.errors?.password?.message}
          />
          <ButtonContainer>
            <Button type="submit">ENTRAR</Button>
          </ButtonContainer>
          {state.authState.error && (
            <FormHelperText role="alert" error>
              Email ou senha inválido
            </FormHelperText>
          )}
        </>
      </Form>
    </Section>
  );
};
