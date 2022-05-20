import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { tap } from 'rxjs/operators';

interface PaymentObject {
  id?: number;
  name: string;
  username: string;
  title: string;
  value: number;
  date: string;
  image?: string;
  isPayed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  api = `${environment.api}/tasks`;

  constructor(private http: HttpClient) { }

  getPayment(params: HttpParams): Observable<HttpResponse<PaymentObject[]>> {
    return this.http.get<PaymentObject[]>(`${this.api}`, { params, observe: 'response' })
      .pipe(
        tap(console.log)
      );
  }

  putPayment(payment: PaymentObject): Observable<PaymentObject> {
    return this.http.put<PaymentObject>(`${this.api}/${payment.id}`, payment)
      .pipe(
        tap(console.log)
      );
  }

  postPayment(payment: PaymentObject): Observable<PaymentObject> {
    return this.http.post<PaymentObject>(`${this.api}`, payment)
      .pipe(
        tap(console.log)
      );
  }

  deletePayment(id: number): Observable<PaymentObject> {
    return this.http.delete<PaymentObject>(`${this.api}/${id}`);
  }

}
