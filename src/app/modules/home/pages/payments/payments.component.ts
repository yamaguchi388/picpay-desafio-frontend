import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { ToastrService } from "ngx-toastr";
import { finalize, first } from "rxjs/operators";
import { ITableColumns } from "../../shared/interfaces/tableColumns";
import { NewPaymentDialogComponent } from "./components/new-payment-dialog/new-payment-dialog.component";
import { IPayment } from "./interfaces";
import { PaymentsService } from "./services/payments/payments.service";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"],
})
export class PaymentsComponent implements OnInit {
  payments: IPayment[] = [];

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

  private getAllPayments() {
    this.isLoading = true;
    this.paymentsService
      .index()
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

    dialogRef.componentInstance.addNewData.pipe(first()).subscribe((result) => {
      if (result && !result.id) return this.store(result);
      if (result && result.id) return this.update(result);
    });
  }

  store(payment: IPayment) {
    this.paymentsService.store(payment).subscribe({
      next: (res) => {
        this.toastr.success("Pagamento criado com sucesso!");
        this.payments = [...this.payments, res];
      },
    });
  }

  update(payment: IPayment) {}
}
