import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentEntity } from 'src/app/domain/interfaces/entity/payment-entity';

@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.scss'],
})
export class DeletePaymentComponent implements OnInit {
  payment: PaymentEntity;

  constructor(
    public dialogRef: MatDialogRef<DeletePaymentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.payment = data?.payment;
  }

  ngOnInit(): void {
    if (!!this.payment) this.payment.date = new Date(this.payment.date);
  }

  close(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogRef.close(this.payment);
  }
}
