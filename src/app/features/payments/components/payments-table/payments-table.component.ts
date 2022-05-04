import { Component, OnInit } from '@angular/core';
import { Payment } from '../../models/payment';
import { PaymentsService } from '../../services/payments.service';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent implements OnInit {

  payments: Payment[];

  constructor(private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.paymentsService.getAll().subscribe(payments => { 
      this.payments = payments;
    });
  }

}
