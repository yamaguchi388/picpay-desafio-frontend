/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTasksEffects, useTasksState } from "../../../../providers/tasks";

export const useMyPayments = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { fetchTasks } = useTasksEffects();
  const { tasks } = useTasksState();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return {
    state: { tasks, isOpenModal },
    handlers: { fetchTasks, handleCloseModal, handleOpenModal },
  };
};
