import { take } from 'rxjs/operators';
import { PaymentModel } from './../../../shared/models/payment.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentsService } from 'src/app/shared/services/payments/payments.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';

@Component({
  selector: 'app-delete-payments',
  templateUrl: './delete-payments.component.html',
  styleUrls: ['./delete-payments.component.scss']
})
export class DeletePaymentsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PaymentModel,
    private paymentService: PaymentsService,
    private diologService: DialogService,
    public dialogRef: MatDialogRef<DeletePaymentsComponent>,
  ) { }

  public ngOnInit(): void {
  }

  public deletePayment(): void {
    this.paymentService.deletePayments(this.data.id)
    .pipe(take(1))
    .subscribe(
      response => {
        this.closeDialog();
      },
      error => this.diologService.getErrors(error),
    );    
  }

  public closeDialog() {    
    this.dialogRef.close(this.data);
  }
}
