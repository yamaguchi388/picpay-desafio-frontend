import { ReactElement } from "react";
import { Button, Input, Section } from "../../../../core/components";
import { Form } from "./styles";
import Image from "next/image";
import logo from "../../../../assets/images/logo.svg";
import { ILoginForm, LoginFormProps } from "./types";
import { FormHelperText, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginFormEnum } from "../../enums";
import { useLoginForm } from "../../hooks/useLoginForm";

export const LoginForm = ({ area }: LoginFormProps): ReactElement => {
  const { formState, handleSubmit, control } = useForm<ILoginForm>({
    mode: "onSubmit",
  });

  const { state, handlers } = useLoginForm();

  return (
    <Section area={area} hasBackground>
      <Form onSubmit={handleSubmit(handlers.fetchAuthenticate)} noValidate>
        <Image src={logo} loading="lazy" alt="logo do picfriends" />
        <Typography variant="h5" component="h1">
          Bem vindo de volta
        </Typography>
        <Input<ILoginForm>
          control={control}
          rules={{
            required: { value: true, message: "O email deve ser informado" },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Informe um email válido",
            },
          }}
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
          rules={{
            required: { value: true, message: "A senha deve ser informada" },
          }}
          type="password"
          variant="outlined"
          label="Senha"
          name={LoginFormEnum.Password}
          id={LoginFormEnum.Password}
          error={!!formState.errors?.password}
          helperText={formState.errors?.password?.message}
        />
        <Button type="submit">ENTRAR</Button>
        {state.authState.error && (
          <FormHelperText role="alert" error>
            Email ou senha inválido
          </FormHelperText>
        )}
      </Form>
    </Section>
  );
};
