import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FormValidationsService } from 'src/app/shared/services/form-validations/form-validations.service';
import { Payment } from 'src/app/shared/models/payment';

@Component({
  selector: 'app-add-payment-modal',
  templateUrl: './add-payment-modal.component.html',
  styleUrls: ['./add-payment-modal.component.scss']
})
export class AddPaymentModalComponent implements OnInit {

  @Input() savePayments: (payment: Payment, isNewPayment: boolean) => void;
  @Input() closeModal: () => void;
  @Input() paymentToEdit: Payment;

  paymentForm: FormGroup;
  hasLoginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private formValidationsService: FormValidationsService,
  ) { }

  ngOnInit(): void {
    const date = this.paymentToEdit?.date
      ? formatDate(this.paymentToEdit?.date, 'yyyy-MM-dd', 'pt')
      : null;

    this.paymentForm = this.formBuilder.group({
      name: [ this.paymentToEdit?.name ?? null, [Validators.required]],
      username: [this.paymentToEdit?.username ?? null, [Validators.required]],
      value: [this.paymentToEdit?.value.toString() ?? null, [Validators.required]],
      date: [date, [Validators.required]],
      title: [this.paymentToEdit?.title ?? null],
    });
  }

  verifyHasError(control: AbstractControl) {
    return !control.valid && control.touched;
  }

  getErrorMessage(fieldName: string, control: AbstractControl) {
    return this.formValidationsService.getErrorMsg(fieldName, control.errors);
  }

  onSubmitLoginForm() {
    const newDate = new Date(this.paymentForm.get('date').value);

    const payment = {
      ...this.paymentForm.value,
      date: newDate.toISOString(),
      isPayed: this.paymentToEdit?.isPayed ?? false,
    };

    this.savePayments(payment, !this.paymentToEdit);
    this.closeModal();
  }

}
