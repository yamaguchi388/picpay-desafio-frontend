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
    public dialog: MatDialog,
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

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public addPaymentDialog(action): void {
    this.setDialogTitle(action);
    const dialogRef = this.dialog.open(AddInsertPaymentsComponent, {
      width: '50vw',
      height: '50vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {
        pageTitle: this.pageTitle,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getPayments();
    });
  }

  public deletePayment(id: number): void {
    const dialogRef = this.dialog.open(DeletePaymentsComponent, {
      width: '25rem',
      height: '25rem',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {
        id,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getPayments();
    });
  }

  public editPayment(action: string, id: number): void {
    this.setDialogTitle(action);
    const dialogRef = this.dialog.open(AddInsertPaymentsComponent, {
      width: '50vw',
      height: '50vh',
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

  public setDialogTitle(action): void {
    action === this.actionTitle
      ? (this.pageTitle = 'Editar Pagamento')
      : (this.pageTitle = 'Adicionar Pagamento');
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
      isPayed: false
    };
    this.paymentService.getPaymentById(id).subscribe((data) => {
      paymentStatusToUpdate = data;
      paymentStatusToUpdate.isPayed = !paymentStatusToUpdate.isPayed;
      this.paymentService.updatePayment(id, paymentStatusToUpdate).subscribe();
    });
  }

}
