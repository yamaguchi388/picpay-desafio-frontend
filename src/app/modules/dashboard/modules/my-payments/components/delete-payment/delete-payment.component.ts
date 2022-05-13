import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPayment } from 'src/app/shared/interfaces/payment';

@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.scss']
})
export class DeletePaymentComponent {

  constructor(
    public dialogRef: MatDialogRef<DeletePaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPayment
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.dialogRef.close(true);
  }


}