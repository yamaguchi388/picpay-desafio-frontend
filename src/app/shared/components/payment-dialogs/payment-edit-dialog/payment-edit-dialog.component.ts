/* eslint-disable no-unused-vars */
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CreatePayment } from 'src/app/core/state/actions/payment-state.actions';
import { DatePipe } from '@angular/common';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Payment } from '../../../types/payments/payment.type';
import { PaymentCreate } from 'src/app/shared/types/payments/payment-create.type';
import { PaymentState } from 'src/app/core/state/states/payment.state';
import { PaymentStateModel } from 'src/app/core/state/models/payment-state.model';
import { PaymentUpdate } from '../../../types/payments/payment-update.type';
import { Store } from '@ngxs/store';
import { UpdatePayment } from 'src/app/core/state/actions/payment-state.actions';
import { joinAndLowerCase } from '../../../utils/join-and-lowercase.util';

@Component({
  selector: 'app-payment-edit-dialog',
  templateUrl: './payment-edit-dialog.component.html',
  styleUrls: ['./payment-edit-dialog.component.scss']
})
export class PaymentEditDialogComponent {
  updatePaymentForm = this.formBuilder.group({
    name: [this.selectedPaymentSnapshot?.name || '', Validators.required],
    value: [this.selectedPaymentSnapshot?.value || '', Validators.required],
    date: [this?.formatedDate || '', Validators.required],
    title: [this.selectedPaymentSnapshot?.title || '', Validators.required]
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
      this.selectedPaymentSnapshot?.date,
      this.dateFormat
    );
  }

  getFormValues<Type>(): Type {
    return this.updatePaymentForm.value as Type;
  }

  handleForm() {
    if (this.selectedPaymentSnapshot) {
      this.setPaymentToUpdate();
      return;
    }

    this.createPayment();
  }

  @Dispatch()
  createPayment() {
    const formValues = this.getFormValues<PaymentCreate>();
    const paymentCreate: PaymentCreate = {
      ...formValues,
      isPayed: false,
      image:
        'https://robohash.org/blanditiisetvoluptatem.png?size=150x150&set=set1',
      username: joinAndLowerCase(formValues.name)
    };
    return new CreatePayment(paymentCreate);
  }

  setPaymentToUpdate() {
    const formValues = this.getFormValues<PaymentUpdate>();
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
