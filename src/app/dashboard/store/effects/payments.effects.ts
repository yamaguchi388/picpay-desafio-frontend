import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PaymentsService } from 'src/app/shared/services/payments.service';
import * as fromActions from '../actions';

@Injectable()
export class PaymentsEffects {
  loadPayments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.loadPayments),
      switchMap(() => {
        return this.paymentsService.getPayments().pipe(
          map((response) => {
            return fromActions.loadPaymentsSuccess({ payload: response });
          }),
          catchError((error) => {
            return of(fromActions.loadPaymentsFailure({ payload: error }));
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private paymentsService: PaymentsService,
    private router: Router
  ) {}
}
