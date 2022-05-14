import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { Payment } from 'src/app/models/payments.model';
import { ModalAnswer } from 'src/app/models/shared.model';
import { ConfirmationService } from 'src/app/services/confirmation/confirmation.service';
import { PaymentsService } from 'src/app/services/payments/payments.service';

import { AddNewPaymentDialogComponent } from '../../components/add-new-payment-dialog/add-new-payment-dialog.component';
import { EditPaymentDialogComponent } from '../../components/edit-payment-dialog/edit-payment-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<Payment>();
  destroy$ = new Subject<boolean>();
  searchFormControl = new FormControl();

  filteredPayments = [];
  payments = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns = ['picture', 'user', 'title', 'date', 'value', 'isPayed', 'actions'];

  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar,
    private readonly confirmationService: ConfirmationService,
  ) {}

  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.getData();
    this.searchFormControl.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe((inputValue) => this.searchForUser(inputValue));
  }

  searchForUser(inputValue: string) {
    if (!inputValue) {
      this.filteredPayments = this.payments;
    }

    this.paymentsService
      .filterPaymentsByUsername(inputValue)
      .pipe(take(1))
      .subscribe((payments: Payment[]) => {
        this.filteredPayments = payments;
        this.setDataSource(this.filteredPayments);
      });
  }

  addNewPayment(): void {
    const dialogRef = this.dialog.open(AddNewPaymentDialogComponent);
    dialogRef.afterClosed().subscribe((dialogData: ModalAnswer) => {
      if (dialogData?.success) {
        this.snackbar.open('Pagamento adicionado!', 'Ok!', { duration: 2000 });
        this.getData();
      }
    });
  }

  openEditPaymentModal(payment: Payment) {
    const dialogRef = this.dialog.open(EditPaymentDialogComponent);
    dialogRef.componentInstance.payment = payment;

    dialogRef.afterClosed().subscribe((modalAnswer: ModalAnswer) => {
      if (modalAnswer?.success) {
        this.snackbar.open('Pagamento editado!', 'Ok!', { duration: 2000 });
        this.getData();
      }
    });
  }

  confirmDeletePayment(paymentId: number): void {
    this.confirmationService
      .openConfirmationDialog({ title: 'Tem certeza?', message: 'Gostaria de apagar esse pagamento?' })
      .subscribe((dialogAnswer: ModalAnswer) => {
        if (dialogAnswer?.answer) {
          this.deletePayment(paymentId);
        }
      });
  }

  deletePayment(paymentId: number): void {
    this.paymentsService
      .deletePayment(+paymentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.snackbar.open('Usuário deletado com sucesso!', 'Ok', {
          duration: 2000,
        });
        this.getData();
      });
  }

  setDataSource(data: Payment[]) {
    this.dataSource.data = data;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getData(): void {
    this.paymentsService
      .getPayments()
      .pipe(take(1))
      .subscribe((payments) => {
        this.payments = payments;
        this.filteredPayments = this.payments;

        this.setDataSource(this.filteredPayments);
      });
  }
}
