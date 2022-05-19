import { request } from "../../request/service";

const URI = "/tasks";

export const fetchTasks = async (): Promise<any> => {
  const { data } = await request.get(URI);
  return data;
};
