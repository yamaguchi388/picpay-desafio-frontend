import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user";
import { authActions } from "./auth.actions";

export interface AuthState {
  user: User;
  isLoading: boolean;
}

export const authInitialState: AuthState = {
  user: null,
  isLoading: false,
};

export const authReducer = createReducer(
    authInitialState,

  on(authActions.login, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(authActions.loginWithSuccess, (_state, action) => ({
    user: action.user,
    isLoading: false,
  }))
);
