import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IPayment } from '../interfaces/payment';
import { QueryPayments } from '../models/query-payments';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  readonly urlAccount = 'http://localhost:3000/tasks';

  private subjUser$: BehaviorSubject<IPayment> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getFiltredPayments(query: QueryPayments): Observable<IPayment | any> {
    const filterName = query.name ? `&name=${query.name}` : ''
    const filterTitle = query.title ? `&title=${query.title}` : ''
    return this.http
      .get<IPayment>(`${this.urlAccount}?_page=${query.page}&_limit=${query.limit}${filterName}${filterTitle}`)
  }

  getAllPayments(): Observable<IPayment | any> {
    return this.http.get<IPayment>(`${this.urlAccount}`)
  }

  savePayment(payment: IPayment) {
    payment.isPayed = false;
    return this.http.post<IPayment>(this.urlAccount, payment);
  }
  
  updatePayment(payment: IPayment) {
    return this.http.put<IPayment>(`${this.urlAccount}/${payment.id}`, payment);
  }

  detelePayment(payment: IPayment) {
    return this.http.delete<IPayment>(`${this.urlAccount}/${payment.id}`);
  }

  logout() {
    this.subjUser$.next(null);
  }
}
