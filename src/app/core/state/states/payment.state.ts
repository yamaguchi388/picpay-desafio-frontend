/* eslint-disable no-unused-vars */
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  GetPayments,
  SetPaymentToEditOrRemove,
  UpdatePayment
} from '../actions/payment-state.actions';
import { DeletePayment } from '../actions/payment-state.actions';
import { Injectable } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { PaymentStateModel } from '../models/payment-state.model';
import { tap } from 'rxjs/operators';

@State<PaymentStateModel>({
  name: 'payments',
  defaults: {
    payments: [],
    selectedPayment: null,
    paymentsQuantity: 0
  }
})
@Injectable()
export class PaymentState {
  constructor(private paymentService: PaymentService) {}

  @Selector()
  static payments(state: PaymentStateModel) {
    return state.payments;
  }

  @Selector()
  static paymentQuantity(state: PaymentStateModel) {
    return state.paymentsQuantity;
  }

  @Selector()
  static selectedPayment(state: PaymentStateModel) {
    return state.selectedPayment;
  }

  @Action(GetPayments)
  getPayments(
    { getState, patchState }: StateContext<PaymentStateModel>,
    action: GetPayments
  ) {
    const state = getState();
    return this.paymentService
      .getPayments(action?.paginationFilters, action.paymentSearch)
      .pipe(
        tap((response) => {
          const payments = response.body;
          const paymentsQuantity: number = Number(
            response.headers.get('X-Total-Count')
          );
          patchState({
            ...state,
            payments,
            paymentsQuantity
          });
        })
      );
  }

  @Action(UpdatePayment)
  updatePayment(ctx: StateContext<PaymentStateModel>, action: UpdatePayment) {
    return this.paymentService.updatePayment(action.paymentUpdate, action.id);
  }

  @Action(DeletePayment)
  deletePayment(ctx: StateContext<PaymentStateModel>, action: DeletePayment) {
    return this.paymentService.deletePayment(action.id);
  }

  @Action(SetPaymentToEditOrRemove)
  setPaymentToEditOrRemove(
    { getState, patchState }: StateContext<PaymentStateModel>,
    action: SetPaymentToEditOrRemove
  ) {
    const state = getState();

    patchState({
      ...state,
      selectedPayment: action.payment
    });
  }
}
