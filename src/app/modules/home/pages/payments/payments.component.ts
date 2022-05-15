import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { ToastrService } from "ngx-toastr";
import { finalize, first } from "rxjs/operators";
import { ITableColumns } from "../../shared/interfaces/tableColumns";
import { DeletePaymentDialogComponent } from "./components/delete-payment-dialog/delete-payment-dialog.component";
import { NewPaymentDialogComponent } from "./components/new-payment-dialog/new-payment-dialog.component";
import { IPaginator, IPayment } from "./interfaces";
import { PaymentsService } from "./services/payments/payments.service";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"],
})
export class PaymentsComponent implements OnInit {
  payments: IPaginator<IPayment[]> = {
    page: 0,
    limit: 5,
    total: 0,
    items: [],
  };

  displayedColumns: ITableColumns[] = [];
  isLoading = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly toastr: ToastrService,
    private readonly paymentsService: PaymentsService
  ) {}

  ngOnInit(): void {
    this.getAllPayments();
  }

  getAllPayments(filter?: string) {
    const { page, limit } = this.payments;
    this.isLoading = true;

    this.paymentsService
      .index(page, limit, filter)
      .pipe(
        first(),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (res) => (this.payments = res),
      });
  }

  openDialog(data?: any) {
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
        },
      });
  }

  update(payment: IPayment) {
    this.paymentsService
      .update(payment)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.toastr.success("Pagamento alterado com sucesso!");

          this.payments.items = this.payments.items.filter((payment) => {
            if (payment.id !== res.id) return payment;
            return res;
          });
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
          this.getAllPayments();
        },
      });
  }
}
