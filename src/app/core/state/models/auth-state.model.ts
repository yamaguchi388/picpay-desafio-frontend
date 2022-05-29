import { Account } from "src/app/shared/types/account/account.type";

export type AuthStateModel = {
  actualAccount: Account;
  isAuthenticated: boolean;
};
