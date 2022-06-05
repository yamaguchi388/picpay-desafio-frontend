import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const selectState = createFeatureSelector<AuthState>("auth");

export const selectUser = createSelector(selectState, state => state.user);