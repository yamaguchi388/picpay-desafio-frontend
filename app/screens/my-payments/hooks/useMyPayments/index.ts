/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import {
  DeleteModalState,
  ITasksData,
  ModalState,
} from "../../../../core/models";
import {
  useTasksEffects,
  useTasksPagination,
  useTasksState,
} from "../../../../providers/tasks";

export const useMyPayments = () => {
  const [modalState, setModalState] = useState<ModalState>({
    id: null,
    isOpen: false,
  });

  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    isOpen: false,
    payment: {} as ITasksData,
  });

  const { fetchTasks, deleteTask, updateTask, handleChangeNextPage } =
    useTasksEffects();
  const { task, tasks } = useTasksState();
  const pagination = useTasksPagination();

  useEffect(() => {
    fetchTasks();
  }, []);

  const memoizedTasks = useMemo(() => tasks, [tasks]);

  const handleOpenModal = () => setModalState({ ...modalState, isOpen: true });
  const handleCloseModal = () =>
    setModalState({ ...modalState, id: null, isOpen: false });

  const handleDeleteTask = (id: number) => {
    setDeleteModalState({
      ...deleteModalState,
      payment: {} as ITasksData,
      isOpen: false,
    });
    deleteTask(id);
  };

  const handleEditTask = (id: number) => setModalState({ id, isOpen: true });

  const handleNextPage = () => handleChangeNextPage();

  const handleDeleteModal = (payment: ITasksData) =>
    setDeleteModalState({ isOpen: true, payment });

  const handleCloseDeleteModal = () =>
    setDeleteModalState({
      ...deleteModalState,
      payment: {} as ITasksData,
      isOpen: false,
    });

  const handleUpdateTask = (payload: ITasksData) => updateTask(payload);

  return {
    state: {
      memoizedTasks,
      tasks,
      task,
      modalState,
      pagination,
      deleteModalState,
    },
    handlers: {
      handleCloseModal,
      handleOpenModal,
      handleDeleteTask,
      handleEditTask,
      handleNextPage,
      handleDeleteModal,
      handleCloseDeleteModal,
      handleUpdateTask,
    },
  };
};
