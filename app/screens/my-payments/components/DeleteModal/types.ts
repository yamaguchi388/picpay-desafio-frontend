import { ITasksData } from "../../../../core/models";

export interface IDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number) => void;
  payment: ITasksData;
}
