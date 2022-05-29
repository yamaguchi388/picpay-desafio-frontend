import { PaymentFilter } from 'src/app/shared/types/payments/payment-filter.type';
/* eslint-disable no-unused-vars */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  GetPayments,
  ResetPaymentToEditOrRemove
} from '../core/state/actions/payment-state.actions';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { FilterPaymentsDialogComponent } from './../shared/components/payment-dialogs/filter-payments-dialog/filter-payments-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../shared/services/notification.service';
import { PageEvent } from '@angular/material/paginator';
import { PaymentEditDialogComponent } from '../shared/components/payment-dialogs/payment-edit-dialog/payment-edit-dialog.component';
import { PaymentState } from '../core/state/states/payment.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {
  @Select(PaymentState.paymentQuantity) paymentQuantity$: Observable<number>;
  searchFormSubscription: Subscription;
  pageIndex: number = 1;
  pageSize: number = 5;
  paymentFilter: PaymentFilter;

  searchForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getPayments();
    this.observeSearchInputChanges();
  }

  ngOnDestroy(): void {
    this.searchFormSubscription.unsubscribe();
  }

  observeSearchInputChanges() {
    this.searchFormSubscription = this.searchForm
      .get('name')
      .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (name) => {
          this.pageIndex = 1;
          this.paymentFilter.name = name;
        }
      });
  }

  openFilterPaymentsDialog() {
    const dialogRef = this.dialog.open(FilterPaymentsDialogComponent);
    dialogRef.afterClosed().subscribe((result: PaymentFilter) => {
      this.paymentFilter = { ...result };
      this.getPayments();
    });
  }

  changePage(pageEvent: PageEvent) {
    if (pageEvent.previousPageIndex === 0) {
      this.pageIndex = 2;
    } else {
      this.pageIndex = pageEvent.pageIndex;
    }
    this.pageSize = pageEvent.pageSize;
    this.getPayments();
  }

  addPayment() {
    this.resetPaymentToEditOrRemove();
    const dialogRef = this.dialog.open(PaymentEditDialogComponent, {
      width: '772px',
      height: '395px'
    });

    dialogRef.afterClosed().subscribe({
      next: (dialogResult) => {
        if (dialogResult?.success) {
          this.notificationService.success('Pagamento adicionado');
          this.getPayments();
        }
      },
      error: (err) => this.notificationService.error(err)
    });

    dialogRef.afterClosed();
  }

  @Dispatch()
  getPayments() {
    const _page: number = this.pageIndex;
    const _limit: number = this.pageSize;
    if (this.paymentFilter) {
      return new GetPayments({ _page, _limit }, { ...this.paymentFilter });
    }
    return new GetPayments({ _page, _limit });
  }

  @Dispatch()
  resetPaymentToEditOrRemove() {
    return new ResetPaymentToEditOrRemove();
  }
}
