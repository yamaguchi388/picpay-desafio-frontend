import { SnackBarService } from './../../service/snack-bar.service';
import { PaymentObject } from './../../models/payment-object';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentService } from './../../service/payment.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  @Input() payment!: PaymentObject;
  @Output() close = new EventEmitter<boolean>();

  constructor(private paymentService: PaymentService, private snackBarService: SnackBarService) { }

  delete(): void {
    this.paymentService.deletePayment(this.payment?.id)
      .subscribe((payment: PaymentObject) => {
        this.close.emit(true);
        this.snackBarService.success('Deletado');
      },
      (error: Error) => {
        this.errorGeneric(error);
      });
  }

  errorGeneric(error: Error): void {
    console.error('Error: ', error);
    if (error.message === '404') {
      this.snackBarService.error('Dados inválidos! Por favor digite novamente.');
    } else {
      this.snackBarService.error();
    }
  }

  cancel(): void {
    this.close.emit(false);
  }

}
