import { TextFieldProps } from "@mui/material";
import { RegisterOptions, FieldValues, Control } from "react-hook-form";

export type InputProps<T> = TextFieldProps & {
  control?: Control<T, string>;
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};
