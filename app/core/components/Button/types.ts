import { ButtonHTMLAttributes } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  color?: "primary" | "secondary";
}
