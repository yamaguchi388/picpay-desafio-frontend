import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPayment } from 'src/app/shared/interfaces/payment';

@Component({
  selector: 'app-edit-payed-payment',
  templateUrl: './edit-payed-payment.component.html',
  styleUrls: ['./edit-payed-payment.component.scss']
})
export class EditPayedPaymentComponent {

  constructor(
    public dialogRef: MatDialogRef<EditPayedPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPayment
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  updatePayment() {
    this.dialogRef.close(true);
  }

}