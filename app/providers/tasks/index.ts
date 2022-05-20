import { useState } from "react";
import { TasksParams, TasksState } from "../../core/models";
import * as api from "../../core/api/tasks";
import constate from "constate";
export const useTasks = () => {
  const [tasks, setTasks] = useState<TasksState>({
    data: null,
    loading: false,
    error: null,
  });

  const [pagination, setPagination] = useState<TasksParams>({
    _page: 1,
    limit: 10,
  });

  const fetchTasks = (params = pagination) => {
    setTasks({ ...tasks, loading: true });
    api
      .fetchTasks(params)
      .then((response) =>
        setTasks({ loading: false, data: response, error: null })
      )
      .catch((error) => setTasks({ data: null, loading: false, error }));
  };

  const handleNextPage = () =>
    fetchTasks({ ...pagination, _page: pagination._page + 1 });

  return {
    state: { tasks },
    effects: { fetchTasks, handleNextPage },
  };
};

const [TasksProvider, useTasksState, useTasksEffects] = constate(
  useTasks,
  (value) => value.state,
  (value) => value.effects
);

export { TasksProvider, useTasksState, useTasksEffects };
