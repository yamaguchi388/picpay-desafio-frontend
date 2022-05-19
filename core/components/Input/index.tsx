import { useState } from "react";
import { InputProps } from "./types";
import { Controller, Path } from "react-hook-form";
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Input = <T,>(props: InputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const type = showPassword ? "text" : props.type;
  const isPasswordType = props.type === "password";

  return (
    <FormControl fullWidth variant={props.variant}>
      <InputLabel htmlFor={props.id} error={props.error}>
        {props.label}
      </InputLabel>
      <Controller
        control={props.control}
        name={props.name as Path<T>}
        rules={props.rules}
        render={({ field }) => (
          <OutlinedInput
            error={props.error}
            fullWidth
            type={type}
            id={props.id}
            value={field.value || ""}
            onChange={field.onChange}
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
        )}
      />
      {!!props.helperText && (
        <FormHelperText error>{props.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
