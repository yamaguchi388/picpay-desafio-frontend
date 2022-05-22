/* eslint-disable react-hooks/rules-of-hooks */
import { Controller, Path } from "react-hook-form";
import {
  InputAdornment,
  OutlinedInput,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { InputProps } from "../../Input/types";
import { useTasksEffects } from "../../../../providers/tasks";
import { useDebounceFn } from "../../../hooks";
import { ChangeEvent } from "react";

export const InputSearch = <T,>(props: InputProps<T>) => {
  const { searchTask, fetchTasks } = useTasksEffects();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    value ? searchTask({ username_like: value }) : fetchTasks();
  };

  const handleChangeDebounce = useDebounceFn(handleChange, 500, [
    props.inputSearch,
  ]);

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
            onChange={(event) => {
              field.onChange(event.target.value);
              handleChangeDebounce(event);
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
