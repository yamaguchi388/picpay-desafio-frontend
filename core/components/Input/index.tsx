import { forwardRef, useState } from "react";
import { InputProps } from "./types";
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const type = showPassword ? "text" : props.type;
  const isPasswordType = props.type === "password";

  return (
    <FormControl fullWidth variant={props.variant}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <OutlinedInput
        fullWidth
        id={props.id}
        type={type}
        ref={ref}
        endAdornment={
          isPasswordType && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
        label="Password"
      />
    </FormControl>
  );
});
Input.displayName = Input.name;
