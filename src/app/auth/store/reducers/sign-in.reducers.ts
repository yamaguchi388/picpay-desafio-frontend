import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on, Action } from '@ngrx/store';
import { LoginUserResponse } from 'src/app/shared/models';
import * as fromActions from '../actions';

export interface SignInState {
  loading: boolean;
  loaded: boolean;
  error: HttpErrorResponse | undefined;
  user?: LoginUserResponse;
}

export const initialState: SignInState = {
  loading: false,
  loaded: false,
  error: undefined,
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.signIn, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(fromActions.signInSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: payload,
  })),
  on(fromActions.signInFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
    user: undefined,
  }))
);

export function reducer(state: SignInState | undefined, action: Action) {
  return featureReducer(state, action);
}
