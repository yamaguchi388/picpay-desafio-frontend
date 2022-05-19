import constate from "constate";
import router from "next/router";
import { useState } from "react";
import * as api from "../../core/api";
import { AccountUserData, AccountUserState } from "../../core/models";
import { ILoginForm } from "../../screens/login/components/LoginForm/types";

export const useAuthentication = () => {
  const [authState, setAuthState] = useState<AccountUserState>({
    data: null,
    loading: false,
    error: null,
  });

  const handleSuccessLogin = (
    data: ILoginForm,
    response: AccountUserData[]
  ) => {
    const isValidUser =
      response[0].email === data.email.trim() &&
      response[0].password === data.password;

    if (!isValidUser) {
      throw new Error("Email ou senha inválido");
    }

    setAuthState({ data: response, loading: false, error: null });
    router.push("/area-cliente/meus-pagamentos");
  };

  const postAuthenticate = (data: ILoginForm) => {
    setAuthState({ ...authState, loading: true });

    api
      .fetchAccountUser()
      .then((response) => handleSuccessLogin(data, response))
      .catch((error) => setAuthState({ data: null, loading: false, error }));
  };

  return {
    state: { authState },
    effects: { postAuthenticate },
  };
};

const [
  AuthenticationProvider,
  useAuthenticationState,
  useAuthenticationEffects,
] = constate(
  useAuthentication,
  (value) => value.state,
  (value) => value.effects
);

export {
  AuthenticationProvider,
  useAuthenticationEffects,
  useAuthenticationState,
};
