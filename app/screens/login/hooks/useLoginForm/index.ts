import {
  useAuthenticationEffects,
  useAuthenticationState,
} from "../../../../providers/authentication";

export const useLoginForm = () => {
  const { fetchAuthenticate } = useAuthenticationEffects();
  const { authState } = useAuthenticationState();

  return { state: { authState }, handlers: { fetchAuthenticate } };
};
