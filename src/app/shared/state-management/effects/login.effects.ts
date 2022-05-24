import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { Account } from "../../models/account.interface";
import { AppError } from "../../models/app-error.interface";
import { AuthService } from "../../services/auth/auth.service";
import { Errors } from "../actions/error.actions";
import { Logged, Login, Unauthorized } from "../actions/login.actions";

@Injectable()
export class LoginEffects {
    login = createEffect(() => this.actions$.pipe(
        ofType(Login),
        switchMap(({ email, password }) => this.authService.login(email, password)
            .pipe(
                map((account: Account) => {
                    if(account) {
                        return Logged();
                    }
                    else {
                        return Unauthorized();
                    }
                }),
                catchError((e) => {
                    let error: AppError = {
                        description: e.message,
                        where: 'LoginEffects:login' 
                    };

                    this.errorStore.dispatch(Errors({ payload: error }))
                    return EMPTY;
                })
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private errorStore: Store<{ error: AppError }>,
        private authService: AuthService
    ) { }
}