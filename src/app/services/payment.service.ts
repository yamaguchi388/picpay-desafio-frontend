import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'
import { PaymentModel } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private httpClient: HttpClient
  ) { }


  searchAllPayments(): Observable<any> {
    return this.httpClient.get(environment.payments);
  }

  searchPaymentsPerPage(page: number = 1, limit: number = 5): Observable<any> {
    const params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);

    return this.httpClient.get(environment.payments, { params });
  }

  insertPayment() {

  }

  updatePayment() {

  }

  deletePayment() {

  }

}
