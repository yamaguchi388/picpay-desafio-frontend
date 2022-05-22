import {
  useAuthenticationEffects,
  useAuthenticationState,
} from "../../../../providers/authentication";

export const useLoginForm = () => {
  const { fetchAuthenticate } = useAuthenticationEffects();
  const { authState } = useAuthenticationState();

  const rules = {
    rulesEmail: {
      required: { value: true, message: "O email deve ser informado" },
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Informe um email válido",
      },
    },
    rulesPassword: {
      required: { value: true, message: "A senha deve ser informada" },
    },
  };

  return { rules, state: { authState }, handlers: { fetchAuthenticate } };
};
