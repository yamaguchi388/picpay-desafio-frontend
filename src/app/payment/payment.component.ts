import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FiltersComponent } from './filters/filters.component';
import { PaymentService } from './../service/payment.service';
import { ProfileNavigationObject } from './../models/profile-object';
import { FilterObject } from './../models/filter-object';
import { PaymentObject } from './../models/payment-object';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
  profile!: ProfileNavigationObject;
  subscription!: Subscription;
  dataSource!: PaymentObject[];
  currentPage!: number;
  sort!: Sort;
  queryParams!: HttpParams;
  limit: number = 5;
  search: string = null;
  filters!: FilterObject;
  limitPerPage = [5, 10, 15, 20, 25, 50, 100];
  limitSelected: number = 5;
  totalSizePagination!: number;
  pageSizeOptions = [1, 2, 3, 4, 5]

  constructor(private paymentService: PaymentService,
    private matDialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.profile = history.state;
    // if (!this.profile[0])
    //   this.router.navigate(['/login']);
    this.queryParams = this.generateQueryParams()
    this.getPayments();
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  getPayments() {
    this.subscription = this.paymentService.getPayment(this.queryParams)
      .subscribe((response: HttpResponse<PaymentObject[]>) => {
        this.dataSource = response.body;
        this.totalSizePagination = Number(response.headers.get('X-Total-Count'));
      });
  }

  actionPage(action: boolean): void {
    if (action) {
      this.queryParams = this.generateQueryParams()
      this.getPayments();
    }
  }

  sortPayment(sort: Sort): void {
    this.sort = sort;
    this.currentPage = 1;
    this.actionPage(true);
  }

  generateQueryParams(): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('_limit', this.limit ?? 5);
    params = params.append('_page', this.currentPage ?? 1);
    if (this.search) {
      params = params.append('name_like', this.search);
    }
    if (this.filters?.title) {
      params = params.append('title_like', this.filters?.title);
    }

    if (this.filters?.value) {
      params = params.append('value', this.filters?.value);
    }
    if (this.filters?.date) {
      params = params.append('date_like', this.filters?.date);
    }
    if (this.filters?.payed) {
      params = params.append('isPayed', this.filters?.payed);
    }
    if (this.sort?.direction) {
      params = params.append('_sort', this.sort?.active);
      params = params.append('_order', this.sort?.direction);
    }
    return params;
  }

  searchValue(value) {
    this.search = value;
    if (!this.search)
      this.actionPage(true);
  }

  clickEventHandlerSearch() {
    this.actionPage(true);
  }

  clickEventHandlerFilters() {
    const dialogRef = this.matDialog.open(FiltersComponent, {
      data: {
        filters: this.filters
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('result', result)
      }
    });
  }

  clickEventHandlerQuery(): void {
    this.limit = this.limitSelected;
    this.currentPage = 1;
    this.actionPage(true);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  editProfile(): void {
    this.router.navigateByUrl('/profile', { state: this.profile });
  }

}
