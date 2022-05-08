import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort, MatSortable } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { debounceTime, finalize, first } from "rxjs/operators";
import { DeletePaymentDialogComponent } from "./components/delete-payment-dialog/delete-payment-dialog.component";
import { NewPaymentDialogComponent } from "./components/new-payment-dialog/new-payment-dialog.component";
import { IFilterParams, IPaginator, IPayment } from "./interfaces";
import { PaymentsService } from "./services/payments/payments.service";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"],
})
export class PaymentsComponent implements OnInit, OnDestroy, AfterViewInit {
  filterForm: FormGroup;
  filterFormSubscription$: Subscription;

  payments: IPaginator<IPayment[]> = {
    page: 0,
    limit: 5,
    total: 0,
    items: [],
  };
  displayedColumns: string[] = [
    "username",
    "title",
    "date",
    "value",
    "isPayed",
    "actions",
  ];

  filtersOptions: IFilterParams[] = [
    {
      key: "Usuário",
      value: "username",
    },
    {
      key: "Título",
      value: "title",
    },
    {
      key: "Data",
      value: "date",
    },
    {
      key: "Valor",
      value: "value",
    },
  ];

  pageSizeOptions: number[] = [5, 10, 25, 50];

  isLoading = false;
  dataSource: MatTableDataSource<IPayment> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly dialog: MatDialog,
    private readonly toastr: ToastrService,
    private readonly paymentsService: PaymentsService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.filterForm = this.formBuilder.group({
      key: ["username"],
      value: [""],
    });

    this.filterFormSubscription$ = this.filterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: () => {
          this.getAllPayments();
        },
      });
  }

  ngAfterViewInit(): void {
    this.getAllPayments();
  }

  ngOnDestroy(): void {
    this.filterFormSubscription$.unsubscribe();
  }

  getAllPayments() {
    const { page, limit } = this.payments;

    this.isLoading = true;

    this.paymentsService
      .index(page, limit, this.filterForm.getRawValue())
      .pipe(
        first(),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (res) => {
          this.payments = res;
          this.setDataSource();
        },
      });
  }

  private setDataSource() {
    this.dataSource = new MatTableDataSource(this.payments.items);
    this.dataSource.sort = this.sort;
  }

  openNewPaymentDialog(data?: any) {
    const dialogRef = this.dialog.open(NewPaymentDialogComponent, {
      width: "70%",
      maxHeight: "500px",
      height: "auto",
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((result) => {
        if (result && !result.id) return this.store(result);
        if (result && result.id) return this.update(result);
      });
  }

  store(payment: IPayment) {
    this.paymentsService
      .store(payment)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.toastr.success("Pagamento criado com sucesso!");
          this.payments.items = [...this.payments.items, res];
          this.payments.total = this.payments.total + 1;

          this.setDataSource();
        },
      });
  }

  update(payment: IPayment) {
    this.paymentsService
      .update(payment)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.success("Pagamento alterado com sucesso!");
          this.payments.items = this.payments.items.map((p) => {
            if (p.id !== payment.id) return p;
            return payment;
          });

          this.setDataSource();
        },
      });
  }

  openDeleteDialog(data: IPayment) {
    const dialogRef = this.dialog.open(DeletePaymentDialogComponent, {
      width: "405px",
      maxHeight: "325pxpx",
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((result) => {
        if (result) {
          this.delete(data);
        }
      });
  }

  delete(payment: IPayment) {
    this.paymentsService
      .delete(payment)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.success("Pagamento excluido com sucesso!");
          this.payments.items = this.payments.items.filter(
            (p) => p.id !== payment.id
          );

          this.setDataSource();
        },
      });
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.payments.limit = pageEvent.pageSize;
    this.payments.page = pageEvent.pageIndex;

    this.getAllPayments();
  }

  handleSort(key: string) {
    this.dataSource.sort.sort({ id: key } as MatSortable);
  }
}
