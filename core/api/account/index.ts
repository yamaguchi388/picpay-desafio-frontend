import { request } from "../../request/service";
const URI = "/account";

export const fetchAccount = async (): Promise<any> => {
  const { data } = await request.get(URI);
  return data;
};
