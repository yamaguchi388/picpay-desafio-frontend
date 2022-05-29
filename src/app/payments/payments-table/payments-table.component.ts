/* eslint-disable no-unused-vars */
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Payment } from '../../shared/types/payments/payment.type';
import { PaymentEditDialogComponent } from 'src/app/shared/components/payment-dialogs/payment-edit-dialog/payment-edit-dialog.component';
import { PaymentState } from '../../core/state/states/payment.state';
import { Payments } from '../../shared/types/payments/payments.type';
import { Select } from '@ngxs/store';
import { SetPaymentToEditOrRemove } from 'src/app/core/state/actions/payment-state.actions';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent {
  @Select(PaymentState.payments) payments$: Observable<Payments>;
  @Output() updatePaymentsList = new EventEmitter();

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
    of(this.setPaymentToEditOrRemove(payment))
      .pipe(
        switchMap(() => {
          const dialogRef = this.dialog.open(PaymentEditDialogComponent, {
            width: '772px',
            height: '395px'
          });
          return dialogRef.afterClosed();
        })
      )
      .subscribe({
        next: () => {
          this.updatePaymentsList.emit();
        }
      });
  }

  @Dispatch()
  setPaymentToEditOrRemove(payment: Payment) {
    return new SetPaymentToEditOrRemove(payment);
  }
}
