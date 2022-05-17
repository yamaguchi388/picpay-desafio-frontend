import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task } from 'src/app/models/task.model';
import { PaymentService } from 'src/app/services/paymentService/payment.service';


@Component({
  selector: 'picpay-delete-payments',
  templateUrl: './delete-payments.component.html',
  styleUrls: ['./delete-payments.component.scss'],
})
export class DeletePaymentsComponent implements OnInit {
  public title = 'Excluir Pagamento';
  public paymentToDelete: Task = {
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
    private paymentService: PaymentService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}

  ngOnInit(): void {
    this.fetchPaymentById(this.data.id);
  }

  public fetchPaymentById(id: number): void {
    this.paymentService.getPaymentById(id).subscribe((data) => {
      this.paymentToDelete = data;
    });
  }

  public deletePayment(id: number): void {
    this.paymentService.deletePayment(id).subscribe(() => {
      this.snackbar.open('Registro excluído com sucesso', 'Fechar', {
        duration: 5000,
        panelClass: ['custom-snackbar']
      });
    });
  }
}
