import { ITasksData, ITasksPayload, TasksParams } from "../../models";
import { request } from "../../request/service";

const URI = "/tasks";

export const fetchTasks = async (
  params: TasksParams
): Promise<ITasksData[]> => {
  const { data } = await request.get(URI, { params });
  return data;
};

export const postTask = async (payload: ITasksPayload): Promise<any> => {
  const { data } = await request.post(URI, payload);
  return data;
};
