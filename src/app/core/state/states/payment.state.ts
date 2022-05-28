import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetPayments } from '../actions/payment-state.actions';
import { Injectable } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { PaymentStateModel } from '../models/payment-state.model';
import { tap } from 'rxjs/operators';

@State<PaymentStateModel>({
  name: 'payments',
  defaults: {
    payments: []
  }
})
@Injectable()
export class PaymentState {
  constructor(private paymentService: PaymentService) {}

  @Selector()
  static payments(state: PaymentStateModel) {
    return state.payments;
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
}
