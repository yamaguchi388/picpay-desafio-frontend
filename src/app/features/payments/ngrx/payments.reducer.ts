import { Payment } from "@app/models/payment";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { paymentsActions } from "./payments.actions";

export interface PaymentState extends EntityState<Payment> {
  totalItens: number;
  isLoading: boolean;
}

export const paymentsAdapter: EntityAdapter<Payment> =
  createEntityAdapter<Payment>();

export const paymentInitialState: PaymentState =
  paymentsAdapter.getInitialState({
    totalItens: 0,
    isLoading: false,
  });

export const paymentsReducer = createReducer(
  paymentInitialState,

  on(paymentsActions.list, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(paymentsActions.listWithSuccess, (state, action) => {
    return paymentsAdapter.setAll(action.payments, {
      ...state,
      isLoading: false,
      totalItens: action.totalItens,
    });
  })
);
