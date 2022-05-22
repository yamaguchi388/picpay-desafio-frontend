import { Controller, Path } from "react-hook-form";
import {
  InputAdornment,
  OutlinedInput,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { InputProps } from "../../Input/types";

export const InputSearch = <T,>(props: InputProps<T>) => {
  return (
    <FormControl fullWidth variant="outlined" sx={{ width: "25ch" }}>
      <Controller
        control={props.control}
        name={props.name as Path<T>}
        render={({ field }) => (
          <OutlinedInput
            size="small"
            error={props.error}
            fullWidth
            placeholder="Pesquise"
            id={props.id}
            value={field.value || ""}
            onChange={field.onChange}
            onInput={props.onInput}
            endAdornment={
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            }
          />
        )}
      />
      {!!props.helperText && (
        <FormHelperText role="alert" error>
          {props.helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
