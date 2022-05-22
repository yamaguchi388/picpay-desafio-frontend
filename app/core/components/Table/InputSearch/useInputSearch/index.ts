import { ChangeEvent } from "react";
import { useTasksEffects } from "../../../../../providers/tasks";
import { useDebounceFn } from "../../../../hooks";

export const useInputSearch = (inputSearch = "") => {
  const { searchTask, fetchTasks } = useTasksEffects();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    value ? searchTask({ username_like: value }) : fetchTasks();
  };

  const handleChangeDebounce = useDebounceFn(handleChange, 1000, [inputSearch]);

  return { handlers: { handleChangeDebounce } };
};
