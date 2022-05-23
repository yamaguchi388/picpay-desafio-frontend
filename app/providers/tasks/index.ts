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

  const [pagination, setPagination] = useState<TasksParams>({
    _page: 1,
    limit: 10,
  });

  const toast = useToast();

  const fetchTasks = (params = pagination) => {
    setTasks({ ...tasks, loading: true });
    api
      .fetchTasks(params)
      .then((response) => {
        if (pagination._page > 1) {
          setTasks((currentTasks) => ({
            ...currentTasks,
            loading: false,
            data: [...(currentTasks.data || []), ...response],
          }));
          return;
        }
        setTasks({
          ...tasks,
          loading: false,
          data: response,
        });
      })
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
        setPagination({ ...pagination, _page: 1 });
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

  const updateTask = (payload: ITasksData) => {
    setTasks({ ...tasks, loading: true });
    api
      .updateTask(payload)
      .then(() => {
        toast.success({ message: "Pagamento atualizado com sucesso" });
        setTasks({ ...tasks, loading: false });
        fetchTasks({ ...pagination, _page: 1 });
      })
      .catch((error) => {
        toast.error({
          message:
            "Ocorreu um erro inesperado ao salvar pagamento. Tente novamente",
        });
        setTasks({ ...tasks, error, loading: false });
      });
  };

  const handleChangeNextPage = () => {
    setPagination((currentPagination) => ({
      ...currentPagination,
      _page: currentPagination._page + 1,
    }));
    fetchTasks({ ...pagination });
  };

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
      handleChangeNextPage,
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
