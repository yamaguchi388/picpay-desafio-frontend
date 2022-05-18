import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task } from 'src/app/models/task.model';
import { PaymentService } from 'src/app/services/paymentService/payment.service';


@Component({
  selector: 'picpay-add-insert-payments',
  templateUrl: './add-insert-payments.component.html',
  styleUrls: ['./add-insert-payments.component.scss'],
})
export class AddInsertPaymentsComponent implements OnInit {
  public paymentForm = new FormGroup({});
  public showUserName = false;
  public message = '';
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
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { pageTitle: string, id?: number }
  ) {}

  ngOnInit(): void {
    this.addRemoveValidators();
    !this.showUserName ? this.updatePayment(this.data.id) : this.createForm();
    this.createForm();
  }

  public createForm(): void {
    this.paymentForm = this.formBuilder.group({
      value: [Validators.required],
      name: ['', Validators.required],
      date: ['', Validators.required],
      title: ['', Validators.required],
      username: ['', Validators.required],
      isPayed: [false],
      image: [''],
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
        username: this.paymentToUpdate.username,
        isPayed: this.paymentToUpdate.isPayed,
        image: this.paymentToUpdate.image,
      });
    });
  }

  public updateData(id: number): void {
    this.paymentService.updatePayment(id, this.paymentForm.value).subscribe(() => {
      this.snackBar();
    });
  }

  public addPayment(): void {
    this.paymentService.insertPayment(this.paymentForm.value).subscribe(() => {
      this.snackBar();
    });
  }

  public addRemoveValidators(): void {
    this.showUserName = this.data.pageTitle === 'Editar Pagamento' ? false : true;
  }

  public snackBar(): void {
    this.message = this.data.pageTitle === 'Editar Pagamento' ? 'Registro alterado com sucesso' : 'Registro inserido com sucesso';
    this.snackbar.open(this.message, 'Fechar', {
      duration: 5000,
      panelClass: ['custom-snackbar']
    });
  }

}
