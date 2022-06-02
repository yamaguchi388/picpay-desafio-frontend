import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { authActions } from "./auth.actions";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap((payload) =>
        this.service.login({
          email: payload.email,
          password: payload.password,
        })
      ),
      map((user) => authActions.loginWithSuccess({ user }))
    )
  );

  constructor(private actions$: Actions, private service: AuthService) {}
}
