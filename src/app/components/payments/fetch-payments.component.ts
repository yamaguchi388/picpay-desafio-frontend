import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Task } from 'src/app/models/task.model';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { AddInsertPaymentsComponent } from './add-insert-payments/add-insert-payments.component';
import { DeletePaymentsComponent } from './delete-payments/delete-payments.component';

@Component({
  selector: 'picpay-payments',
  templateUrl: './fetch-payments.component.html',
  styleUrls: ['./fetch-payments.component.scss'],
})
export class FetchPaymentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public pageTitle = '';
  public actionTitle = 'edit';
  public title = 'Meus Pagamentos';
  public checked = false;
  public dataSource = new MatTableDataSource<Task>();
  public displayedColumns: string[] = [
    'name',
    'title',
    'date',
    'value',
    'isPayed',
    'actions',
  ];

  constructor(
    private readonly paymentService: PaymentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPayments();
  }

  public getPayments(): void {
    this.paymentService.getPayments().subscribe((tasks) => {
      this.dataSource.data = Object.values(tasks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(valueToFilter: string): void {
    this.dataSource.filter = valueToFilter.trim().toLowerCase();
  }

  public configureDialogAndSnackbar(componentName, id?: number, pageTitle?: string): void {
    const dialogRef = this.dialog.open(componentName, {
      width: '60vw',
      height: '60vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {
        pageTitle: this.pageTitle,
        id,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getPayments();
    });
  }

  public addPaymentDialog(action): void {
    this.setDialogTitle(action);
    this.configureDialogAndSnackbar(AddInsertPaymentsComponent, null, this.pageTitle);
  }

  public editPayment(action: string, id: number): void {
    this.setDialogTitle(action);
    this.configureDialogAndSnackbar(AddInsertPaymentsComponent, id, this.pageTitle);
  }

  public deletePayment(id: number): void {
    this.configureDialogAndSnackbar(DeletePaymentsComponent, id);
  }

  public setDialogTitle(action): void {
    this.pageTitle = action === this.actionTitle
      ? 'Editar Pagamento'
      : 'Adicionar Pagamento';
  }

  public updatePaymentStatus(id: number): void {
    let paymentStatusToUpdate: Task = {
      id: 0,
      name: '',
      username: '',
      title: '',
      value: 0,
      date: '',
      image: '',
      isPayed: false,
    };
    this.paymentService.getPaymentById(id).subscribe((data) => {
      paymentStatusToUpdate = data;
      paymentStatusToUpdate.isPayed = !paymentStatusToUpdate.isPayed;
      this.paymentService.updatePayment(id, paymentStatusToUpdate).subscribe();
    });
  }

}
