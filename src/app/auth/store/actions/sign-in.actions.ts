import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthCredentials, LoginUserResponse } from 'src/app/shared/models';

export enum SignInTypes {
  SIGN_IN = '[Sign in] Sign In',
  SIGN_IN_SUCCESS = '[Sign in] Sign In Success',
  SIGN_IN_FAILURE = '[Sign in] Sign In Failure',
}

export const signIn = createAction(
  SignInTypes.SIGN_IN,
  props<{ payload: AuthCredentials }>()
);

export const signInSuccess = createAction(
  SignInTypes.SIGN_IN_SUCCESS,
  props<{ payload: LoginUserResponse }>()
);

export const signInFailure = createAction(
  SignInTypes.SIGN_IN_FAILURE,
  props<{ payload: HttpErrorResponse | undefined }>()
);
