import { createAction, props } from '@ngrx/store';

export const Login = createAction(
    '[Login] Login',
    props<{ password: string, email: string }>()
);

export const Logged = createAction(
    '[Login] Login success'
);

export const Unauthorized = createAction(
    '[Login] Login unathorized'
);