import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaymentsService } from 'src/app/core/services/payments/payments.service';
import { Payment } from 'src/app/data/models/payments.model';

import { AddNewPaymentDialogComponent } from '../../components/add-new-payment-dialog/add-new-payment-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<Payment>();
  destroy$ = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns = ['picture', 'user', 'title', 'date', 'value', 'isPayed'];

  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {}

  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.getData();
  }

  addNewPayment(): void {
    const dialogRef = this.dialog.open(AddNewPaymentDialogComponent);
    dialogRef.afterClosed().subscribe((dialogData) => {
      if (dialogData?.success) {
        this.snackbar.open('Pagamento adicionado!', 'Ok!', { duration: 2000 });
        this.getData();
      }
    });
  }

  private getData(): void {
    this.paymentsService
      .getPayments()
      .pipe(takeUntil(this.destroy$))
      .subscribe((payments) => {
        console.log(payments);
        this.dataSource.data = payments;
        this.dataSource.sort = this.sort;

        this.dataSource.paginator = this.paginator;
      });
  }
}
