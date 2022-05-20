import constate from "constate";
import router from "next/router";
import { useState } from "react";
import * as api from "../../core/api";
import { IAccountUserData, AccountUserState } from "../../core/models";
import { decrypt, encrypt, storeLoggedUser } from "../../core/utils";
import { ILoginForm } from "../../screens/login/components/LoginForm/types";

export const useAuthentication = () => {
  const [authState, setAuthState] = useState<AccountUserState>({
    data: null,
    loading: false,
    error: null,
  });

  const handleSuccessLogin = (data: string, response: IAccountUserData[]) => {
    const [email, password] = decrypt(data).split(":");

    const isValidUser =
      response[0].email === email && response[0].password === password;

    if (!isValidUser) {
      throw new Error("Email ou senha inválido");
    }

    storeLoggedUser(response[0]);

    setAuthState({ data: response, loading: false, error: null });
    router.push("/area-cliente/meus-pagamentos");
  };

  const fetchAuthenticate = (data: ILoginForm) => {
    const { email, password } = data;
    const credentials = `${email}:${password}`;

    const encryptedData = encrypt(credentials);

    setAuthState({ ...authState, loading: true });

    api
      .fetchAccountUser()
      .then((response) => handleSuccessLogin(encryptedData, response))
      .catch((error) => setAuthState({ data: null, loading: false, error }));
  };

  return {
    state: { authState },
    effects: { fetchAuthenticate },
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
