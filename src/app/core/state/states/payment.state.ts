/* eslint-disable no-unused-vars */
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  GetPayments,
  SetPaymentToEditOrRemove,
  UpdatePayment
} from '../actions/payment-state.actions';
import { Injectable } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { PaymentStateModel } from '../models/payment-state.model';
import { tap } from 'rxjs/operators';
import { DeletePayment } from '../actions/payment-state.actions';

@State<PaymentStateModel>({
  name: 'payments',
  defaults: {
    payments: [],
    selectedPayment: null
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
  static selectedPayment(state: PaymentStateModel) {
    return state.selectedPayment;
  }

  @Action(GetPayments)
  getPayments(
    { getState, patchState }: StateContext<PaymentStateModel>,
    action: GetPayments
  ) {
    const state = getState();
    return this.paymentService.getPayments(action?.paginationFilters).pipe(
      tap((payments) => {
        patchState({
          ...state,
          payments
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
