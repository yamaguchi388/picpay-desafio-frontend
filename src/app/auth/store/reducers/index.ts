import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromSignInReducer from './sign-in.reducers';

export interface SignInState {
  signIn: fromSignInReducer.SignInState;
}

export const reducers: ActionReducerMap<SignInState> = {
  signIn: fromSignInReducer.reducer,
};

export const getSignInState = createFeatureSelector<SignInState>('auth');
