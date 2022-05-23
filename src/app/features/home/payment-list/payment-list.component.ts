import { Component, Input, OnInit } from '@angular/core';
import { Payment } from './../../../shared/models/payment';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

  @Input() payments: Payment[];
  @Input() onShowConfirmDeletePaymentModal: (payment: Payment) => void;
  @Input() onShowPaymentModal: (payment: Payment) => void;
  @Input() handleOrderByCol: (col: string) => void;
  @Input() handleUpdatePaidOut: (payment: Payment) => void;

  constructor() { }

  ngOnInit(): void {
  }
}
