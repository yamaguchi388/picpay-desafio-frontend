import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentEntity } from 'src/app/domain/interfaces/entity/payment-entity';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
})
export class AddPaymentComponent implements OnInit {
  paymentForm: FormGroup;
  payment: PaymentEntity;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPaymentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.payment = data?.payment;
    this.paymentForm = this.createForm();
  }

  ngOnInit(): void {
    this.paymentForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: [this.payment?.name ?? '', Validators.required],
      username: [this.payment?.username ?? '', Validators.required],
      title: [this.payment?.title ?? ''],
      value: [this.payment?.value ?? '', Validators.required],
      date: [ 
        this.payment?.date ? new Date(this.payment?.date) : '',
        Validators.required,
      ],
    });
  }

  formatDate(date: Date): string {
    date = new Date(date);
    var isoString = date.toISOString()
    return isoString.substring(0, (isoString.indexOf("T")|0) + 6|0);
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.paymentForm.value);
  }
}
