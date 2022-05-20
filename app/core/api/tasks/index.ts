import { TasksParams } from "../../models";
import { request } from "../../request/service";

const URI = "/tasks";

export const fetchTasks = async (params: TasksParams): Promise<any> => {
  console.log(params);

  const { data } = await request.get(URI, { params });
  return data;
};
