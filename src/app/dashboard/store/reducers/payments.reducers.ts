import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on, Action } from '@ngrx/store';
import { Payment } from 'src/app/shared/models';
import { Page } from 'src/app/shared/models/page';
import * as fromActions from '../actions';

export interface PaymentsState {
  loading: boolean;
  loaded: boolean;
  data?: Payment[];
  error?: HttpErrorResponse;
  page?: Page;
}

export const initialState: PaymentsState = {
  loaded: false,
  loading: false,
};

const featureReducer = createReducer(
  initialState,
  on(fromActions.loadPayments, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(fromActions.loadPaymentsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    data: payload,
  })),
  on(fromActions.loadPaymentsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function reducer(state: PaymentsState | undefined, action: Action) {
  return featureReducer(state, action);
}
