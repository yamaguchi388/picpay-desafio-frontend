/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useTasksEffects, useTasksState } from "../../../../providers/tasks";

export const useMyPayments = () => {
  const { fetchTasks } = useTasksEffects();
  const { tasks } = useTasksState();

  useEffect(() => {
    fetchTasks();
  }, []);
  return { state: { tasks }, handlers: { fetchTasks } };
};
