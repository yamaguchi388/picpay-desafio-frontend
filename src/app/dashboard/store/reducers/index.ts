import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromPaymentsState from './payments.reducers';

export interface PaymentsState {
  dashboard: fromPaymentsState.PaymentsState;
}

export const reducers: ActionReducerMap<PaymentsState> = {
  dashboard: fromPaymentsState.reducer,
};

export const getPaymentsState =
  createFeatureSelector<PaymentsState>('dashboard');
