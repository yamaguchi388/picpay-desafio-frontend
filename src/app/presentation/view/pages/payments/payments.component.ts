import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPaymentsController } from 'src/app/domain/interfaces/controllers/ipayments-controller';
import { PaymentEntity } from 'src/app/domain/interfaces/entity/payment-entity';
import { AddPaymentComponent } from '../../shared/dialogs/add-payment/add-payment.component';
import { DeletePaymentComponent } from '../../shared/dialogs/delete-payment/delete-payment.component';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  payments: PaymentEntity[] = [];
  unfilteredPayments: PaymentEntity[] = [];
  paginatorOptions: { pageNumber: number; pageSize: number } = {
    pageNumber: 1,
    pageSize: 10,
  };
  filterString: string = '';

  constructor(
    private matDialog: MatDialog,
    private paymentsController: IPaymentsController,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this.paymentsController.getPayments()
    .subscribe((payments) => {
      this.payments = payments;
      this.unfilteredPayments = payments;
    });
  }

  applyCustomFilter(filters: []): void {
    let queryString = '';

    filters.forEach((filter: any) => {
      if(filter.value) queryString += `${filter.column}=${filter.value}&`;
    });
    this.paymentsController.getPayments(queryString)
    .subscribe((payments) => {
      this.payments = payments;
      this.unfilteredPayments = payments;
    });
  }

  openPaymentDialog(payment?: PaymentEntity | null): void {
    this.matDialog
      .open(AddPaymentComponent, {
        width: '772px',
        data: { payment },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          if (!payment) return this.createPayment(value);
          return this.updatePayment({ ...payment, ...value });
        }
      });
  }

  filterChanged(value: any): void {
    this.filterString = value.filter.queryString;
    this.paginatorOptions = value.paginator;

    const regex = new RegExp(this.filterString, "i");
    const filteredData  = this.unfilteredPayments.filter(payment => {
      return regex.test(payment.name);
    });
    this.payments = [...filteredData];
}

  createPayment(payment: PaymentEntity): void {
    this.paymentsController.createPayment(payment).subscribe((payment) => {
      this.payments.push(payment);
      this.payments = [...this.payments];
      this.unfilteredPayments.push(payment);
      this.unfilteredPayments = [...this.unfilteredPayments];
      this.notification.open('Pagamento criado com sucesso!', 'Fechar');
    });
  }

  updatePayment(payment: PaymentEntity): void {
    console.log('payment', payment);
    this.paymentsController
      .updatePayment(payment.id, payment)
      .subscribe((payment) => {
        const index = this.payments.findIndex((p) => p.id === payment.id);
        this.payments[index] = payment;
        this.payments = [...this.payments];
        this.unfilteredPayments[index] = payment;
        this.unfilteredPayments = [...this.unfilteredPayments];
        this.notification.open('Pagamento atualziado com sucesso!', 'Fechar');
      });
  }

  deletePayment(payment: PaymentEntity): void {
    this.matDialog
      .open(DeletePaymentComponent, {
        width: '400px',
        data: { payment },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          this.paymentsController.deletePayment(payment.id).subscribe(() => {
            const index = this.payments.findIndex((p) => p.id === payment.id);
            this.payments.splice(index, 1);
            this.payments = [...this.payments];
            this.unfilteredPayments.splice(index, 1);
            this.unfilteredPayments = [...this.unfilteredPayments];
            this.notification.open('Pagamento deletado com sucesso!', 'Fechar');
          });
        }
      });
  }
}
