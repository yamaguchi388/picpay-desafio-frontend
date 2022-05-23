import { ITasksData } from "../../models";

export interface ITableProps {
  rows: ITasksData[];
  onEdit: (id: number) => void;
  onNextPage: () => void;
  onDeleteModal: (payment: ITasksData) => void;
  loading: boolean;
}
