import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentObject } from './../../models/payment-object';
import { PaymentService } from './../../service/payment.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form!: FormGroup;
  pipe = new TitleCasePipe();
  @Input() payment!: PaymentObject;
  @Output() close = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: [this.payment?.name ?? null, [Validators.required]],
      value: [this.payment?.value ?? null, [Validators.required]],
      date: [this.payment?.date ?? null, [Validators.required]],
      title: [this.payment?.title ?? null]
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('this.form.valid', this.form.valid)
      if (this.payment) {
        console.log('this.payment', this.payment)
        this.update();
      } else {
        console.log('else')
        this.add();
      }
    }
  }

  update(): void {
    this.paymentService.putPayment(this.create())
      .subscribe((payment: PaymentObject) => {
        console.log('payment', payment)
        this.close.emit(true);
      },
        error => {
          console.error('Error: ', error);
        })
  }

  add(): void {
    this.paymentService.postPayment(this.create()).subscribe((payment: PaymentObject) => {
      this.close.emit(true);
    },
      error => {
        console.error('Error: ', error);
      })
  }

  create(): PaymentObject {
    return {
      id: this.payment?.id ?? null,
      name: this.pipe.transform(this.form?.get('userName')?.value),
      username: this.payment?.username ?? this.form?.get('userName')?.value,
      title: this.pipe.transform(this.form?.get('title')?.value),
      value: this.form?.get('value')?.value,
      date: new Date(this.form?.get('date')?.value).toISOString(),
      image: this.payment?.image ?? null,
      isPayed: this.payment?.isPayed ?? false
    }
  }

  cancel(): void {
    this.close.emit(false);
  }

}
