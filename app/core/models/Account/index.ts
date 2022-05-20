import { AsyncState } from "../AsyncState";

export interface IAccountUserData {
  email: string;
  id?: number;
  name: string;
  password: string;
  token: string;
}

export type AccountUserState = AsyncState<IAccountUserData[]>;
