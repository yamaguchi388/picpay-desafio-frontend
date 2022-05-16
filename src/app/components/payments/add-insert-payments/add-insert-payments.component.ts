import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { PaymentService } from 'src/app/services/paymentService/payment.service';

@Component({
  selector: 'picpay-add-insert-payments',
  templateUrl: './add-insert-payments.component.html',
  styleUrls: ['./add-insert-payments.component.scss'],
})
export class AddInsertPaymentsComponent implements OnInit {
  public paymentForm = new FormGroup({});
  public paymentToUpdate: Task = {
    id: 0,
    name: '',
    username: '',
    title: '',
    value: 0,
    date: '',
    image: '',
    isPayed: false,
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: { pageTitle: string, id?: number }
  ) {}

  ngOnInit(): void {
    this.updatePayment(this.data.id);
    console.log('oninit', this.paymentToUpdate);
    this.paymentForm = this.formBuilder.group({
      value: ['', Validators.required],
      name: ['', Validators.required],
      date: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  public updatePayment(id: number): void {
    this.paymentService.getPaymentById(id).subscribe((data) => {
      this.paymentToUpdate = data;
      this.paymentForm.patchValue({
        name: this.paymentToUpdate.name,
        value: this.paymentToUpdate.value,
        date: this.paymentToUpdate.date,
        title: this.paymentToUpdate.title,
      });
    });
  }

  public updateData(id: number): void {
    this.paymentService.updatePayment(id, this.paymentForm.value).subscribe((data) => {
      console.log('Alteração feita', data);
    });
  }

}
