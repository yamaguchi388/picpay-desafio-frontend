import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { paymentsAdapter, PaymentState } from "./payments.reducer";

export const selectState = createFeatureSelector<PaymentState>("payments");

const { selectAll } = paymentsAdapter.getSelectors();

export const selectAllPayments = createSelector(selectState, selectAll);
export const selectTotalPayments = createSelector(selectState, state => state.totalItens);
