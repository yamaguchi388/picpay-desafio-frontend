import { Component, Inject, OnInit } from "@angular/core";
import { Payment } from "@app/models/payment";
import { paymentFormGroup } from "../../payments.config";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActionsSubject, Store } from "@ngrx/store";
import { paymentsActions } from "../../ngrx/payments.actions";
import { filter, first } from "rxjs/operators";

@Component({
  selector: "app-payment-create-edit",
  templateUrl: "./payment-create-edit.component.html",
  styleUrls: ["./payment-create-edit.component.scss"],
})
export class PaymentCreateEditComponent implements OnInit {
  formGroup = paymentFormGroup();

  constructor(
    private store: Store,
    private actionListener$: ActionsSubject,
    private dialogRef: MatDialogRef<PaymentCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Payment
  ) {
    if (this.data?.id) this.formGroup = paymentFormGroup(this.data);
  }

  ngOnInit(): void {
    this.actionListener$
      .pipe(
        filter((action) => action.type == paymentsActions.saveWithSuccess.type),
        first()
      )
      .subscribe(() => this.close());
  }

  save() {
    if (this.formGroup.valid) {
      const payment: Payment = this.formGroup.value;
      payment.id
        ? this.store.dispatch(
            paymentsActions.update({ payment: this.formGroup.value })
          )
        : this.store.dispatch(
            paymentsActions.save({ payment: this.formGroup.value })
          );
    } else this.formGroup.markAllAsTouched();
  }

  close() {
    this.dialogRef.close();
  }
}
