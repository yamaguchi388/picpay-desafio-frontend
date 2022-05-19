import {
  useAuthenticationEffects,
  useAuthenticationState,
} from "../../../../providers/authentication";

export const useLoginForm = () => {
  const { postAuthenticate } = useAuthenticationEffects();
  const { authState } = useAuthenticationState();
  return { state: { authState }, handlers: { postAuthenticate } };
};
