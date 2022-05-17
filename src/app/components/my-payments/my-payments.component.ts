import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { concatMap, first, map } from 'rxjs';
import { ActionEnum } from 'src/app/enums/action.enum';
import { PaymentModel } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { FormPaymentComponent } from '../form-payment/form-payment.component';

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss']
})
export class MyPaymentsComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['image', 'name', 'title', 'value', 'date', 'isPayed', 'action'];

  filterPaymentsOptions: string[] = ['Nome', 'Usuário', 'Título', 'Data', 'Pago'];
  filterData: string = '';
  selectedFilter: string = this.filterPaymentsOptions[0];

  dataSource: MatTableDataSource<PaymentModel>;
  totalRecords: number = 0;
  pageSize: number = 5;

  payments: PaymentModel[];
  allPayments: PaymentModel[];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() hidePageSize: boolean = true;

  loaded: boolean = false;



  constructor(
    private paymentService: PaymentService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.paymentService
      .searchAllPayments()
      .pipe(
        map((paymentsResponse: PaymentModel[]) => {
          this.totalRecords = paymentsResponse.length;
          this.allPayments = paymentsResponse;
        }),
        concatMap(() => this.paymentService.searchPaymentsPerPage()),
        map((paymentsData) => {
          this.payments = paymentsData;
          this.dataSource = new MatTableDataSource<PaymentModel>(paymentsData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      )
      .subscribe(() => this.loaded = true);
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  searchPayments(event) {
    this.paymentService
      .searchPaymentsPerPage(event.pageIndex, event.pageSize)
      .pipe(first())
      .subscribe((paymentsData) => {
        this.payments = paymentsData;
        this.dataSource = new MatTableDataSource<PaymentModel>(paymentsData);
      });
  }

  sortData(sort: Sort) {
    const data = this.payments.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource<PaymentModel>(data);
      return;
    }

    this.dataSource = new MatTableDataSource<PaymentModel>(data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'value': return this.compare(a.value, b.value, isAsc);
        case 'date': return this.compare(a.date, b.date, isAsc);
        case 'isPayed': return this.compare(a.isPayed, b.isPayed, isAsc);
        default: return 0;
      }
    }));
  }

  compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  filterOptionSelected(event) {
    this.selectedFilter = event.source.value;
  }

  insertPayment() {
    this.openDialog(ActionEnum.INSERT);
  }

  editPayment(payment) {
    this.openDialog(ActionEnum.UPDATE, payment);
  }

  deletePayment(payment) {
    const index = this.dataSource.data.indexOf(payment, 0);
    this.openDialog(ActionEnum.DELETE, this.dataSource.data[index]);
  }

  updatePaidValue(element) {
    const index = this.dataSource.data.indexOf(element, 0);
    this.paymentService
      .updatePayment(this.dataSource.data[index].id, element)
      .pipe()
      .subscribe(() => {
        this.openSnackBar('Pagamento atualizado com sucesso!', 'OK');
      });
  }

  openDialog(action: ActionEnum, payment?: PaymentModel): void {
    const dialogRef = this.dialog.open(FormPaymentComponent, {
      width: '60rem',
      data: { action: action, payment: payment },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  filterPaymentsData() {
    if (this.filterData) {
      this.dataSource = new MatTableDataSource<PaymentModel>(this.allPayments);
      this.dataSource.filter = this.filterData;
    } else {
      this.snackBar.open('Você precisa informar o dado que deseja filtrar!', 'OK');
    }
  }

}

