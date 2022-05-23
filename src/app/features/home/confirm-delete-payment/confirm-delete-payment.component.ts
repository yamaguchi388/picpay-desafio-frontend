import { Component, OnInit, Input } from '@angular/core';
import { Payment } from './../../../shared/models/payment';

@Component({
  selector: 'app-confirm-delete-payment',
  templateUrl: './confirm-delete-payment.component.html',
  styleUrls: ['./confirm-delete-payment.component.scss']
})
export class ConfirmDeletePaymentComponent implements OnInit {

  @Input() onConfirmDeletPayment: () => void;
  @Input() closeModal: () => void;
  @Input() payment: Payment;

  constructor() { }

  ngOnInit(): void { }

  onConfirm = (): void => {
    this.onConfirmDeletPayment();
    this.closeModal();
  }

}
