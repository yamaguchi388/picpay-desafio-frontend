import { Payment } from './../../../shared/models/payment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-payment-list-item]',
  templateUrl: './payment-list-item.component.html',
  styleUrls: ['./payment-list-item.component.scss']
})
export class PaymentListItemComponent implements OnInit {

  @Input() payment: Payment;
  @Input() onShowConfirmDeletePaymentModal: (payment: Payment) => void;
  @Input() onShowPaymentModal: (payment: Payment) => void;
  @Input() handleUpdatePaidOut: (payment: Payment) => void;

  constructor() { }

  ngOnInit(): void {
  }

  generateId = (prefix: string, index: number): string => {
    return `${prefix}-${index}`;
  }

  showPaymentModal = (): void => {
    this.onShowPaymentModal(this.payment);
  }

  showConfirmDeleteModal = (): void => {
    this.onShowConfirmDeletePaymentModal(this.payment);
  }

}
