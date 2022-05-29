/* eslint-disable no-unused-vars */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { GetPayments } from '../core/state/actions/payment-state.actions';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { PaymentState } from '../core/state/states/payment.state';
import { Select } from '@ngxs/store';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {
  @Select(PaymentState.paymentQuantity) paymentQuantity$: Observable<number>;
  searchFormSubscription: Subscription;

  searchForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) {}

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
      .subscribe(this.getPayments);
  }

  changePage(pageEvent: PageEvent) {
    this.getPayments('', pageEvent.pageIndex + 1, pageEvent.pageSize);
  }

  @Dispatch()
  getPayments(name: string = '', _page: number = 0, _limit: number = 5) {
    if (name) {
      return new GetPayments({ _page, _limit }, { name });
    }
    return new GetPayments({ _page, _limit });
  }
}
