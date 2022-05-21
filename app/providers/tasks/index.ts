import { useState } from "react";
import { ITasksData, TasksParams, TasksState } from "../../core/models";
import * as api from "../../core/api/tasks";
import constate from "constate";
import { useToast } from "../../core/hooks";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TasksState>({
    data: null,
    loading: false,
    error: null,
  });

  const toast = useToast();

  const pagination: TasksParams = {
    _page: 1,
    limit: 10,
  };

  const fetchTasks = (params = pagination) => {
    setTasks({ ...tasks, loading: true });
    api
      .fetchTasks(params)
      .then((response) =>
        setTasks({ loading: false, data: response, error: null })
      )
      .catch((error) => setTasks({ data: null, loading: false, error }));
  };

  const postTask = async (data: ITasksData) => {
    setTasks({ ...tasks, loading: true });

    api
      .postTask(data)
      .then((response) => {
        setTasks({ loading: false, data: response, error: null });
        toast.success({ message: "Pagamento adicionado com sucesso" });
        fetchTasks({ ...pagination });
      })
      .catch((error) => {
        setTasks({ data: null, loading: false, error });
        toast.success({
          message:
            "Ocorreu um erro inesperado ao salvar pagamento. Tente novamente",
        });
      });
  };

  const handleNextPage = () =>
    fetchTasks({ ...pagination, _page: pagination._page + 1 });

  const handlePreviousPage = () =>
    fetchTasks({ ...pagination, _page: pagination._page - 1 });

  return {
    state: { tasks },
    effects: { fetchTasks, postTask, handleNextPage, handlePreviousPage },
  };
};

const [TasksProvider, useTasksState, useTasksEffects] = constate(
  useTasks,
  (value) => value.state,
  (value) => value.effects
);

export { TasksProvider, useTasksState, useTasksEffects };
