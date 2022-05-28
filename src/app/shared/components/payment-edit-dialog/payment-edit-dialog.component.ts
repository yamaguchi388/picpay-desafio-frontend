/* eslint-disable no-unused-vars */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Payment } from '../../types/payments/payment.type';
import { PaymentState } from 'src/app/core/state/states/payment.state';
import { PaymentStateModel } from 'src/app/core/state/models/payment-state.model';
import { PaymentUpdate } from '../../types/payments/payment-update.type';
import { Store } from '@ngxs/store';
import { UpdatePayment } from 'src/app/core/state/actions/payment-state.actions';

@Component({
  selector: 'app-payment-edit-dialog',
  templateUrl: './payment-edit-dialog.component.html',
  styleUrls: ['./payment-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentEditDialogComponent {
  updatePaymentForm = this.formBuilder.group({
    name: [this.selectedPaymentSnapshot.name, Validators.required],
    value: [this.selectedPaymentSnapshot.value, Validators.required],
    date: [this.formatedDate, Validators.required],
    title: [this.selectedPaymentSnapshot.title, Validators.required]
  });

  readonly dateFormat: string = 'd MMM y, h:mm:ss';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private datePipe: DatePipe
  ) {}

  get selectedPaymentSnapshot(): Payment {
    return this.store.selectSnapshot<PaymentStateModel>(PaymentState)
      .selectedPayment;
  }

  get formatedDate(): string {
    return this.datePipe.transform(
      this.selectedPaymentSnapshot.date,
      this.dateFormat
    );
  }

  setPaymentToUpdate() {
    const formValues = this.updatePaymentForm.value as PaymentUpdate;

    const paymentUpdate: PaymentUpdate = {
      ...formValues
    };
    this.updatePayment(paymentUpdate);
  }

  @Dispatch()
  updatePayment(paymentUpdate: PaymentUpdate) {
    return new UpdatePayment(paymentUpdate, this.selectedPaymentSnapshot.id);
  }
}
