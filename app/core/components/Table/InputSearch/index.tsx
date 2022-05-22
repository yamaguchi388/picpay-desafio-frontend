import { Controller, Path } from "react-hook-form";
import {
  InputAdornment,
  OutlinedInput,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { InputProps } from "../../Input/types";
import { useInputSearch } from "./useInputSearch";

export const InputSearch = <T,>(props: InputProps<T>) => {
  const { handlers } = useInputSearch(props.inputSearch as string);

  return (
    <FormControl fullWidth variant="outlined" sx={{ width: "30ch" }}>
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
            onChange={(event) => {
              field.onChange(event.target.value);
              handlers.handleChangeDebounce(event);
            }}
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
