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
  totalPaymentRecords: number;
  currentTablePage: number;
  tableRowsPerPage: number;
  nameFilter: string = '';

  constructor(private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.currentTablePage = 0;
    this.tableRowsPerPage = 5;

    this.fetchPayments();
  }

  handleTablePagination(event): void {
    this.currentTablePage = event.page;
    this.tableRowsPerPage = event.rows;

    this.fetchPayments();
  }

  filterPaymentsByName(): void {
    this.currentTablePage = 0;
    
    this.fetchPayments();
  }

  fetchPayments(): void {
    this.paymentsService.getPaginated(this.currentTablePage + 1, this.tableRowsPerPage, this.nameFilter)
      .subscribe(response => { 
        this.payments = <Payment[]> response.body;
        this.totalPaymentRecords = <number> response.headers.get('X-Total-Count');
    });
  }

}
