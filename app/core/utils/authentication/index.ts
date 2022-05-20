import { IAccountUserData } from "../../models";
import * as localStorage from "../cache";

const PAYFRIENDS_LOGGED_USER = "payfriends:user";

export const storeLoggedUser = (user: IAccountUserData) =>
  localStorage.set(PAYFRIENDS_LOGGED_USER, user);

export const getLoggedUser = () =>
  (localStorage.get(PAYFRIENDS_LOGGED_USER) as IAccountUserData) ?? {};
