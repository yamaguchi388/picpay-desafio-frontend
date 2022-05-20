import { AsyncState } from "../AsyncState";

export interface TasksData {
  id: number;
  name: string;
  username: string;
  title: string;
  value: number;
  date: string;
  image: string;
  isPayed: boolean;
}

export type TasksState = AsyncState<TasksData[]>;
