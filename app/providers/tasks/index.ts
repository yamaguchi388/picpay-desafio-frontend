import { useState } from "react";
import {
  ITasksData,
  TasksParams,
  TasksState,
  TaskState,
} from "../../core/models";
import * as api from "../../core/api/tasks";
import constate from "constate";
import { useToast } from "../../core/hooks";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TasksState>({
    data: null,
    loading: false,
    error: null,
  });

  const [task, setTask] = useState<TaskState>({
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

  const fetchTaskById = (id: number) => {
    setTask({ ...task, loading: true });
    api
      .fetchTaskById(id)
      .then((response) => {
        setTask({ ...tasks, data: response, loading: false });
      })
      .catch((error) => {
        setTask({ ...task, error, loading: false });
        toast.error({
          message: "Ocorreu um erro ao buscar pagamento. Tente novamente",
        });
      });
  };

  const createTask = async (data: ITasksData) => {
    setTasks({ ...tasks, loading: true });

    api
      .createTask(data)
      .then(() => {
        toast.success({ message: "Pagamento adicionado com sucesso" });
        fetchTasks({ ...pagination });
      })
      .catch((error) => {
        setTasks({ ...tasks, loading: false, error });
        toast.error({
          message:
            "Ocorreu um erro inesperado ao salvar pagamento. Tente novamente",
        });
      });
  };

  const deleteTask = async (id: number) => {
    setTasks({ ...tasks, loading: true });
    api
      .deleteTask(id)
      .then(() => {
        toast.success({ message: "Pagamento deletado com sucesso." });
        fetchTasks({ ...pagination });
      })
      .catch((error) => {
        setTasks({ ...tasks, loading: false, error });
        toast.error({
          message:
            "Ocorreu um erro inesperado ao excluir pagamento. Tente novamente",
        });
      });
  };

  const searchTask = async (params: any) => {
    setTasks({ ...tasks, loading: true });
    api
      .searchTask(params)
      .then((response) =>
        setTasks({ ...tasks, data: response, loading: false })
      )
      .catch((error) => setTasks({ ...tasks, error, data: [] }));
  };

  const updateTask = (id: number) => {};

  const handleNextPage = () =>
    fetchTasks({ ...pagination, _page: pagination._page + 1 });

  const handlePreviousPage = () =>
    fetchTasks({ ...pagination, _page: pagination._page - 1 });

  return {
    state: { tasks, task },
    pagination,
    effects: {
      createTask,
      fetchTasks,
      fetchTaskById,
      deleteTask,
      searchTask,
      updateTask,
      handleNextPage,
      handlePreviousPage,
    },
  };
};

const [TasksProvider, useTasksState, useTasksPagination, useTasksEffects] =
  constate(
    useTasks,
    (value) => value.state,
    (value) => value.pagination,
    (value) => value.effects
  );

export { TasksProvider, useTasksState, useTasksPagination, useTasksEffects };
