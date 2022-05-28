import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { PaymentState } from '../../core/state/states/payment.state';
import { Payments } from '../../shared/types/payments/payments.type';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent {
  @Select(PaymentState.payments) payments$: Observable<Payments>;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  sort: MatSort;
  displayedColumns: string[] = [
    'name',
    'title',
    'date',
    'value',
    'isPayed',
    'actions'
  ];

  setDataSourceAttributes() {
    //this.dataSource.sort = this.sort;
  }
}
