/* eslint-disable no-unused-vars */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Payment } from '../../types/payments/payment.type';
import { PaymentState } from 'src/app/core/state/states/payment.state';
import { PaymentStateModel } from 'src/app/core/state/models/payment-state.model';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-payment-edit-dialog',
  templateUrl: './payment-edit-dialog.component.html',
  styleUrls: ['./payment-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentEditDialogComponent {
  updatePaymentForm = this.formBuilder.group({
    username: [this.selectedPaymentSnapshot.username, Validators.required],
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
}
