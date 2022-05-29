import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Payment } from 'src/app/shared/models/payment';
import { PaymentsService } from 'src/app/shared/services/payments.service';
import * as fromActions from '../../store/actions';
import * as fromSelectors from '../../store/selectors';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed'];
  dataSource: MatTableDataSource<Payment>;
  payments$ = this.store.select(fromSelectors.getPaymentsData);
  subscriptions$ = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public paymentsService: PaymentsService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fromActions.loadPayments());
    this.subscriptions$.add(
      this.payments$.subscribe((data) => {
        this.dataSource = new MatTableDataSource<Payment>(data);
        this.dataSource.paginator = this.paginator;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
