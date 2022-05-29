import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Payment } from 'src/app/shared/models/payment';

export enum PaymentActionTypes {
  LOAD_PAYMENTS = '[Dashboard] Load Payments',
  LOAD_PAYMENTS_SUCCESS = '[Dashboard] Load Payments Success',
  LOAD_PAYMENTS_FAILURE = '[Dashboard] Load Payments Failure',
}

export const loadPayments = createAction(PaymentActionTypes.LOAD_PAYMENTS);

export const loadPaymentsSuccess = createAction(
  PaymentActionTypes.LOAD_PAYMENTS_SUCCESS,
  props<{ payload: Payment[] }>()
);

export const loadPaymentsFailure = createAction(
  PaymentActionTypes.LOAD_PAYMENTS_FAILURE,
  props<{ payload: HttpErrorResponse }>()
);
