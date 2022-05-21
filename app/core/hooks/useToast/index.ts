import { useContext } from "react";
import { ToastContext } from "../../../providers/toast";

interface IToastParam {
  message: string;
}

type Toast = {
  success: ({ message }: IToastParam) => void;
  error: ({ message }: IToastParam) => void;
};

export const useToast = (): Toast => {
  const toastContext = useContext(ToastContext) as Toast;

  if (!toastContext) {
    throw Error('"useToast" must be used within ToastContext.Provider');
  }

  return toastContext;
};
