import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { Payment } from "@app/models/payment";
import { ActionsSubject, Store } from "@ngrx/store";
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { merge, Observable, Subscription } from "rxjs";
import { debounceTime, filter } from "rxjs/operators";
import { paymentsActions } from "../../ngrx/payments.actions";
import { PaymentState } from "../../ngrx/payments.reducer";
import {
  selectAllPayments,
  selectTotalPayments,
} from "../../ngrx/payments.selector";
import {
  columnNames,
  formGroupForFilterInPaymentTable,
  parseFilters,
  parseSort,
  searchablePaymentActions,
  selectOptions,
} from "../../payments.config";
import { PaymentCreateEditComponent } from "../payment-create-edit/payment-create-edit.component";
import { PaymentDeleteComponent } from "../payment-delete/payment-delete.component";

@Component({
  selector: "app-payments-table",
  templateUrl: "./payments-table.component.html",
  styleUrls: ["./payments-table.component.scss"],
})
export class PaymentsTableComponent implements OnInit, OnDestroy {
  displayedColumns = columnNames;
  options = selectOptions;
  dataSource$: Observable<Payment[]>;
  totalItens$: Observable<number>;
  subscriptions: Subscription = new Subscription();
  moreFilters = new FormControl(false);

  @ViewChild("paginator", { static: true }) paginator: NzPaginationComponent;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  formGroup = formGroupForFilterInPaymentTable();

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
        this.formGroup.valueChanges.pipe(debounceTime(400)),
        this.sort.sortChange,
        actionsListener
      ).subscribe(() => this.search())
    );
  }

  search() {
    const query = {
      ...parseFilters(this.formGroup.value),
      ...parseSort(this.sort),
    };

    this.store.dispatch(
      paymentsActions.list({
        pagination: { _limit: 10, _page: this.paginator?.nzPageIndex || 1 },
        query,
      })
    );
  }

  openModal(payment: Payment, component: any, width: number = 750) {
    this.dialog.open(component, {
      width: width + "px",
      data: payment,
    });
  }

  save(payment: Payment) {
    this.openModal(payment, PaymentCreateEditComponent);
  }

  delete(payment: Payment) {
    this.openModal(payment, PaymentDeleteComponent, 400);
  }

  clearAllFilters() {
    this.formGroup.reset();
    this.formGroup.controls["isPayed_like"].setValue("");
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
