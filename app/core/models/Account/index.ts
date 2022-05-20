import { AsyncState } from "../AsyncState";

export interface AccountUserData {
  email: string;
  id?: number;
  name: string;
  password: string;
  token: string;
}

export type AccountUserState = AsyncState<AccountUserData[]>;
