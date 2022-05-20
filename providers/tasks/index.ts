import { useState } from "react";
import { TasksState } from "../../core/models";
import * as api from "../../core/api/tasks";
import constate from "constate";
export const useTasks = () => {
  const [tasks, setTasks] = useState<TasksState>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchTasks = () => {
    setTasks({ ...tasks, loading: true });
    api
      .fetchTasks()
      .then((response) =>
        setTasks({ loading: false, data: response, error: null })
      )
      .catch((error) => setTasks({ data: null, loading: false, error }));
  };

  return {
    state: { tasks },
    effects: { fetchTasks },
  };
};

const [TasksProvider, useTasksState, useTasksEffects] = constate(
  useTasks,
  (value) => value.state,
  (value) => value.effects
);

export { TasksProvider, useTasksState, useTasksEffects };
