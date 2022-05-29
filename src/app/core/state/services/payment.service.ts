/* eslint-disable no-unused-vars */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationFilters } from 'src/app/shared/types/pagination-filters.type';
import { PaymentCreate } from 'src/app/shared/types/payments/payment-create.type';
import { PaymentFilter } from 'src/app/shared/types/payments/payment-filter.type';
import { PaymentUpdate } from 'src/app/shared/types/payments/payment-update.type';
import { Payments } from 'src/app/shared/types/payments/payments.type';
import { environment } from 'src/environments/environment';
import { objectToQueryString } from 'src/app/shared/utils/object-to-query-string.util';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  tasksUrl: string = environment.tasks;

  constructor(private http: HttpClient) {}

  getPayments(
    paginationFilters: PaginationFilters = null,
    paymentFilter?: PaymentFilter,
    _sort: string = 'name',
    _order: string = 'asc'
  ): Observable<HttpResponse<Payments>> {
    const paginationFiltersQueryString = objectToQueryString(paginationFilters);

    const paymentFiltersQueryString = objectToQueryString(
      paymentFilter
    ).replace('?', '&');

    const url: string = `${this.tasksUrl}${paginationFiltersQueryString}${paymentFiltersQueryString}&_sort=${_sort}&_order=${_order}`;
    return this.http.get<Payments>(url, { observe: 'response' });
  }

  updatePayment(paymentUpdate: PaymentUpdate, id: number) {
    const url: string = `${this.tasksUrl}/${id}`;
    return this.http.patch(url, paymentUpdate);
  }

  createPayment(paymentCreate: PaymentCreate) {
    const url: string = `${this.tasksUrl}`;
    return this.http.post(url, paymentCreate);
  }

  deletePayment(id: number) {
    const url: string = `${this.tasksUrl}/${id}`;
    return this.http.delete(url);
  }
}
