/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  useTasksEffects,
  useTasksPagination,
  useTasksState,
} from "../../../../providers/tasks";

export const useMyPayments = () => {
  const [modalState, setModalState] = useState<{
    id: number | null;
    isOpen: boolean;
  }>({
    id: null,
    isOpen: false,
  });

  const { fetchTasks, deleteTask, updateTask } = useTasksEffects();
  const { task, tasks } = useTasksState();
  const pagination = useTasksPagination();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenModal = () => setModalState({ ...modalState, isOpen: true });
  const handleCloseModal = () =>
    setModalState({ ...modalState, id: null, isOpen: false });

  const handleDeleteTask = (id: number) => deleteTask(id);
  const handleEditTask = (id: number) => {
    setModalState({ id, isOpen: true });
    updateTask(id);
  };

  return {
    state: { tasks, task, modalState, pagination },
    handlers: {
      handleCloseModal,
      handleOpenModal,
      handleDeleteTask,
      handleEditTask,
    },
  };
};
