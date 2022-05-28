/* eslint-disable no-unused-vars */
import { Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Payment } from '../../shared/types/payments/payment.type';
import { PaymentEditDialogComponent } from 'src/app/shared/components/payment-edit-dialog/payment-edit-dialog.component';
import { PaymentState } from '../../core/state/states/payment.state';
import { Payments } from '../../shared/types/payments/payments.type';
import { Select } from '@ngxs/store';
import { SetPaymentToEditOrRemove } from 'src/app/core/state/actions/payment-state.actions';

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

  constructor(private dialog: MatDialog) {}

  setDataSourceAttributes() {
    //this.dataSource.sort = this.sort;
  }

  editPayment(payment: Payment) {
    of(this.setPaymentToEditOrRemove(payment)).subscribe({
      next: () =>
        this.dialog.open(PaymentEditDialogComponent, {
          width: '772px',
          height: '395px'
        })
    });
  }

  @Dispatch()
  setPaymentToEditOrRemove(payment: Payment) {
    return new SetPaymentToEditOrRemove(payment);
  }
}
