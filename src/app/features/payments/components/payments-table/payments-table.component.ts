import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Payment } from "@app/models/payment";
import { Store } from "@ngrx/store";
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { merge, Observable, Subscription } from "rxjs";
import { paymentsActions } from "../../ngrx/payments.actions";
import { PaymentState } from "../../ngrx/payments.reducer";
import {
  selectAllPayments,
  selectTotalPayments,
} from "../../ngrx/payments.selector";

@Component({
  selector: "app-payments-table",
  templateUrl: "./payments-table.component.html",
  styleUrls: ["./payments-table.component.scss"],
})
export class PaymentsTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["user", "title", "date", "value", "isPayed"];
  dataSource$: Observable<Payment[]>;
  totalItens$: Observable<number>;
  subscriptions: Subscription = new Subscription()

  @ViewChild("paginator", { static: true }) paginator: NzPaginationComponent;
  userControl = new FormControl("");

  constructor(private store: Store<PaymentState>) {
    this.search();
  }

  ngOnInit(): void {
    this.dataSource$ = this.store.select(selectAllPayments);
    this.totalItens$ = this.store.select(selectTotalPayments);
    this.subscribers();
  }

  subscribers() {
    this.subscriptions.add(merge(
      this.paginator.nzPageIndexChange,
      this.userControl.valueChanges
    ).subscribe(() => this.search()));
  }

  search() {
    this.store.dispatch(
      paymentsActions.list({
        pagination: { _limit: 10, _page: this.paginator?.nzPageIndex || 1 },
        query: {
          name_like: this.userControl.value,
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
