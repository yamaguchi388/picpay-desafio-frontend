import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SnackbarService } from "@app/core/services/snackbar.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { authActions } from "./auth.actions";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap((payload) =>
        this.service
          .login({
            email: payload.email,
            password: payload.password,
          })
          .pipe(
            map((user) => {
              if (user) {
                this.snack.success("Bem vindo!");
                this.router.navigateByUrl("/payments");
                return authActions.loginWithSuccess({ user });
              }
              throw { status: 400 };
            }),
            catchError((error) => {
              if (error.status < 500)
                this.snack.error("Verifique suas credenciais");
              return of(authActions.loginWithError());
            })
          )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      map(() => {
        this.snack.normal("Saindo...");
        this.router.navigateByUrl("/login");
        return authActions.logoutWithSuccess();
      })
    )
  );

  constructor(
    private actions$: Actions,
    private service: AuthService,
    private router: Router,
    private snack: SnackbarService
  ) {}
}
