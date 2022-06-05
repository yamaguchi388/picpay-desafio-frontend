import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Payment } from "@app/models/payment";
import { ActionsSubject, Store } from "@ngrx/store";
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { merge, Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { paymentsActions } from "../../ngrx/payments.actions";
import { PaymentState } from "../../ngrx/payments.reducer";
import {
  selectAllPayments,
  selectTotalPayments,
} from "../../ngrx/payments.selector";
import { searchablePaymentActions } from "../../payments.config";
import { PaymentCreateEditComponent } from "../payment-create-edit/payment-create-edit.component";
import { PaymentDeleteComponent } from "../payment-delete/payment-delete.component";

@Component({
  selector: "app-payments-table",
  templateUrl: "./payments-table.component.html",
  styleUrls: ["./payments-table.component.scss"],
})
export class PaymentsTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    "user",
    "title",
    "date",
    "value",
    "isPayed",
    "actions",
  ];
  dataSource$: Observable<Payment[]>;
  totalItens$: Observable<number>;
  subscriptions: Subscription = new Subscription();

  @ViewChild("paginator", { static: true }) paginator: NzPaginationComponent;
  userControl = new FormControl("");

  constructor(
    private store: Store<PaymentState>,
    private dialog: MatDialog,
    private actionListener$: ActionsSubject
  ) {
    this.search();
  }

  ngOnInit(): void {
    this.dataSource$ = this.store.select(selectAllPayments);
    this.totalItens$ = this.store.select(selectTotalPayments);
    this.subscribers();
  }

  subscribers() {
    const actionsListener = this.actionListener$.pipe(
      filter((action) => searchablePaymentActions.includes(action.type))
    );
    this.subscriptions.add(
      merge(
        this.paginator.nzPageIndexChange,
        this.userControl.valueChanges,
        actionsListener
      ).subscribe(() => this.search())
    );
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

  openModal(payment: Payment, component: any, width: number = 750) {
    this.dialog.open(component, {
      width: width + 'px',
      data: payment,
    });
  }

  save(payment: Payment) {
    this.openModal(payment, PaymentCreateEditComponent);
  }

  delete(payment: Payment) {
    this.openModal(payment, PaymentDeleteComponent, 400);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
