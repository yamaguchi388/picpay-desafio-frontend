import { Component } from '@angular/core';
import { DeletePayment } from 'src/app/core/state/actions/payment-state.actions';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Payment } from 'src/app/shared/types/payments/payment.type';
import { PaymentState } from 'src/app/core/state/states/payment.state';
import { PaymentStateModel } from 'src/app/core/state/models/payment-state.model';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-payment-delete-dialog',
  templateUrl: './payment-delete-dialog.component.html',
  styleUrls: ['./payment-delete-dialog.component.scss']
})
export class PaymentDeleteDialogComponent {
  // eslint-disable-next-line no-unused-vars
  constructor(private store: Store) {}

  @Dispatch()
  deletePayment() {
    return new DeletePayment(this?.selectedPaymentSnapshot?.id);
  }

  get selectedPaymentSnapshot(): Payment {
    return this.store.selectSnapshot<PaymentStateModel>(PaymentState)
      ?.selectedPayment;
  }
}
