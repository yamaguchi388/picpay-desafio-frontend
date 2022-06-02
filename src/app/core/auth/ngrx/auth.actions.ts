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

export const authActions = {
  login,
  loginWithSuccess,
};
