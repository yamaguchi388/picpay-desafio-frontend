import { LabelHTMLAttributes } from "react";

export interface IlabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  labelText: string;
  isRequired?: boolean;
}
