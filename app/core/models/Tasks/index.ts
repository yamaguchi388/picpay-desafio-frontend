import { AsyncState } from "../AsyncState";

export interface ITasksData {
  id: number;
  name: string;
  username: string;
  title: string;
  value: number;
  date: string;
  image: string;
  isPayed: boolean;
}

export type TasksState = AsyncState<ITasksData[]>;

export type TasksParams = {
  _page: number;
  limit: number;
};
