import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Payment } from "@app/models/payment";
import { ActionsSubject, Store } from "@ngrx/store";
import { filter, first } from "rxjs/operators";
import { paymentsActions } from "../../ngrx/payments.actions";

@Component({
  selector: "app-payment-delete",
  templateUrl: "./payment-delete.component.html",
  styleUrls: ["./payment-delete.component.scss"],
})
export class PaymentDeleteComponent implements OnInit {
  constructor(
    private store: Store,
    private actionListener$: ActionsSubject,
    private dialogRef: MatDialogRef<PaymentDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Payment
  ) {}

  ngOnInit(): void {
    this.actionListener$
      .pipe(
        filter(
          (action) => action.type == paymentsActions.deleteWithSuccess.type
        ),
        first()
      )
      .subscribe(() => this.close());
  }

  delete() {
    this.store.dispatch(paymentsActions.delete({ payment: this.data }));
  }

  close() {
    this.dialogRef.close();
  }
}
