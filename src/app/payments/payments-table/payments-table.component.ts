/* eslint-disable no-unused-vars */
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  SetPaymentToEditOrRemove,
  UpdatePayment
} from 'src/app/core/state/actions/payment-state.actions';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Payment } from '../../shared/types/payments/payment.type';
import { PaymentDeleteDialogComponent } from '../../shared/components/payment-dialogs/payment-delete-dialog/payment-delete-dialog.component';
import { PaymentEditDialogComponent } from 'src/app/shared/components/payment-dialogs/payment-edit-dialog/payment-edit-dialog.component';
import { PaymentState } from '../../core/state/states/payment.state';
import { PaymentUpdate } from 'src/app/shared/types/payments/payment-update.type';
import { Payments } from '../../shared/types/payments/payments.type';
import { Select } from '@ngxs/store';
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

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

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
        next: (dialogResult) => {
          if (dialogResult?.success) {
            this.notificationService.success('Pagamento atualizado');
            this.updatePaymentsList.emit();
          }
        }
      });
  }

  deletePayment(payment: Payment) {
    of(this.setPaymentToEditOrRemove(payment))
      .pipe(
        switchMap(() => {
          const dialogRef = this.dialog.open(PaymentDeleteDialogComponent, {
            width: '405',
            height: '325x'
          });
          return dialogRef.afterClosed();
        })
      )
      .subscribe({
        next: (dialogResult) => {
          if (dialogResult?.success) {
            this.notificationService.success('Pagamento Excluido');
            this.updatePaymentsList.emit();
          }
        }
      });
  }

  confirmPayment(payment: Payment, change: MatCheckboxChange) {
    const paymentUpdate: PaymentUpdate = {
      isPayed: change.checked
    };
    this.updatePayment(paymentUpdate, payment.id);
  }

  @Dispatch()
  setPaymentToEditOrRemove(payment: Payment) {
    return new SetPaymentToEditOrRemove(payment);
  }

  @Dispatch()
  updatePayment(paymentUpdate: PaymentUpdate, id: number) {
    return new UpdatePayment(paymentUpdate, id);
  }
}
