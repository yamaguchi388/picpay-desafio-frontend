import { ITasksData, TasksParams } from "../../models";
import { request } from "../../request/service";

const URI = "/tasks";

export const fetchTasks = async (
  params: TasksParams
): Promise<ITasksData[]> => {
  const { data } = await request.get(URI, { params });
  return data;
};

export const fetchTaskById = async (id: number): Promise<ITasksData> => {
  const { data } = await request.get(`${URI}/${id}`);
  console.log("BY ID TASK", data);

  return data;
};

export const createTask = async (payload: ITasksData): Promise<ITasksData> => {
  const { data } = await request.post(URI, payload);
  return data;
};

export const deleteTask = async (id: number): Promise<void> => {
  const { data } = await request.delete(`${URI}/${id}`);
  return data;
};
