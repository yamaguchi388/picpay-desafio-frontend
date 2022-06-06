import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";

const login = createAction(
  "[AUTH] Login",
  props<{ email: string; password: string }>()
);

const loginWithSuccess = createAction(
  "[AUTH] Login With Success",
  props<{ user: User }>()
);

const loginWithError = createAction("[AUTH] Login With Error");

const logout = createAction("[AUTH] Logout");

const logoutWithSuccess = createAction("[AUTH] Logout With Success");

export const authActions = {
  login,
  loginWithSuccess,
  loginWithError,
  logout,
  logoutWithSuccess,
};
