import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SignInService } from 'src/app/shared/services/sign-in.service';
import * as fromActions from '../actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthCredentials } from 'src/app/shared/models';
import { Router } from '@angular/router';

@Injectable()
export class SignInEffects {
  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.signIn),
      switchMap(({ payload }: { payload: AuthCredentials }) =>
        this.signInService.signIn(payload).pipe(
          map((userResponse) =>
            fromActions.signInSuccess({ payload: userResponse })
          ),
          catchError((error) =>
            of(fromActions.signInFailure({ payload: error }))
          )
        )
      )
    );
  });

  signInSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromActions.signInSuccess),
        tap(() => {
          this.router.navigate(['/dashboard']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private signInService: SignInService,
    private router: Router
  ) {}
}
