/* eslint-disable no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationFilters } from 'src/app/shared/types/pagination-filters.type';
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
    paginationFilters: PaginationFilters = null
  ): Observable<Payments> {
    const queryString =
      objectToQueryString<PaginationFilters>(paginationFilters);
    const url: string = this.tasksUrl + queryString;
    return this.http.get<Payments>(url);
  }

  updatePayment(paymentUpdate: PaymentUpdate, id: number) {
    const url: string = `${this.tasksUrl}/${id}`
    return this.http.patch(url, paymentUpdate);
  }
}
