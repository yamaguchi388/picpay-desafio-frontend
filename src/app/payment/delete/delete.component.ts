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

  constructor(private paymentService: PaymentService) { }

  delete(): void {
    this.paymentService.deletePayment(this.payment?.id)
      .subscribe((payment: PaymentObject) => {
        this.close.emit(true);
      },
        error => {
          console.error('Error: ', error);
        });
  }

  cancel(): void {
    this.close.emit(false);
  }

}
