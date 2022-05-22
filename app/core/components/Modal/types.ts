import { ReactNode } from "react";

export interface IModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}
