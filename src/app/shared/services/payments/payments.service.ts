import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Payment } from './../../models/payment';
import { take } from 'rxjs/operators';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private httpClient: HttpClient) { }

  getPayments({ page, limit, sort, order, name = '' }): Observable<Payment[]> {
    const queryParams = !name.length ? '' : `&name_like=${name}`;
    return this.httpClient.get<Payment[]>(
      `${API_URL}tasks?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}${queryParams}`
    );
  }

  addPayment(payment: Payment): Observable<Payment> {
    return this.httpClient.post<Payment>(`${API_URL}tasks`, payment).pipe(take(1));
  }

  updatePayment(payment: Payment): Observable<Payment> {
    return this.httpClient.put<Payment>(`${API_URL}tasks/${payment.id}`, payment).pipe(take(1));
  }

  deletePayment(id: number): Observable<any> {
    return this.httpClient.delete(`${API_URL}tasks/${id}`).pipe(take(1));
  }
}
