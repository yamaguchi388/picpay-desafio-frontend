import { AccountUserData } from "../../models";
import { request } from "../../request/service";
const URI = "/account";

export const fetchAccountUser = async (): Promise<AccountUserData[]> => {
  const { data } = await request.get(URI);
  console.log("DATA", data);

  return data;
};
