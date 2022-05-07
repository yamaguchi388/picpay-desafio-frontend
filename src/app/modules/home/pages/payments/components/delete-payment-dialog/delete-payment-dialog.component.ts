import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPayment } from '../../interfaces';

@Component({
  selector: 'app-delete-payment-dialog',
  templateUrl: './delete-payment-dialog.component.html',
  styleUrls: ['./delete-payment-dialog.component.scss']
})
export class DeletePaymentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeletePaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPayment
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.dialogRef.close(true);
  }


}
