/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { UseFormSetValue, UseFormReset } from "react-hook-form";
import { ITasksData } from "../../../../core/models";
import { currency, formatDate, replaceCurrency } from "../../../../core/utils";
import { useTasksEffects, useTasksState } from "../../../../providers/tasks";
import { AddPaymentFormEnum } from "../../enums";

interface UseFormModalFn {
  modalState: { id: number | null; isOpen: boolean };
  reset: UseFormReset<ITasksData>;
  setValue: UseFormSetValue<ITasksData>;
  onClose: () => void;
}

export const useFormModal = ({
  modalState,
  reset,
  setValue,
  onClose,
}: UseFormModalFn) => {
  const { createTask, fetchTaskById, updateTask } = useTasksEffects();
  const { task } = useTasksState();

  const rules = {
    rulesName: {
      required: {
        value: true,
        message: "O nome deve ser informado",
      },
    },
    rulesUsername: {
      required: {
        value: true,
        message: "O usuário deve ser informado",
      },
    },
    rulesDate: {
      required: { value: true, message: "A data deve ser informada" },
    },
    rulesValue: {
      required: {
        value: true,
        message: "O valor deve ser informado",
      },
    },
  };

  useEffect(() => {
    modalState.id ? fetchTaskById(modalState.id) : reset();
  }, [modalState]);

  useEffect(() => {
    if (!!task.data) {
      //@ts-ignore
      setValue(AddPaymentFormEnum.Name, task.data.name);
      //@ts-ignore
      setValue(AddPaymentFormEnum.Username, task.data.username);
      //@ts-ignore
      setValue(AddPaymentFormEnum.Date, formatDate(task.data.date));
      //@ts-ignore
      setValue(AddPaymentFormEnum.Value, currency(task.data.value as number));
      //@ts-ignore
      setValue(AddPaymentFormEnum.Title, task.data.title);
      //@ts-ignore
      setValue(AddPaymentFormEnum.IsPayed, task.data.isPayed);
    }
  }, [task]);

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: ITasksData) => {
    const date = new Date(data.date).toISOString();

    modalState.id
      ? updateTask({ ...data, id: modalState.id, date })
      : createTask({
          ...data,
          date,
          image: "",
          isPayed: data.isPayed ? data.isPayed : true,
          value: +replaceCurrency(data.value as string),
        });
    handleClose();
  };

  return { rules, state: { task }, handlers: { handleClose, onSubmit } };
};
