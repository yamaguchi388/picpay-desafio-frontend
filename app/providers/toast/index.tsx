/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Toast } from "../../core/components";
import { IToast } from "../../core/models";
import { uuid } from "../../core/utils";

export const ToastContext = createContext(null) as any;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const removeToast = (id: string) => {
    setToasts((currentToasts) => [
      ...currentToasts.filter((currentToast) => currentToast.id !== id),
    ]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      toasts.forEach((toast) => removeToast(toast.id as string));
    }, 6000);

    return () => clearTimeout(timeout);
  }, [toasts]);
  const addtoast = useCallback((params: IToast) => {
    const id = uuid();

    setToasts((currentToasts) => [...currentToasts, { id, ...params }]);
  }, []);

  const values = useMemo(
    () => ({
      success: ({ message = "" }) => addtoast({ message, type: "success" }),
      error: ({ message = "" }) => addtoast({ message, type: "error" }),
    }),
    [toasts]
  );

  return (
    <ToastContext.Provider value={values}>
      {children}
      <Toast toasts={toasts} />
    </ToastContext.Provider>
  );
};
