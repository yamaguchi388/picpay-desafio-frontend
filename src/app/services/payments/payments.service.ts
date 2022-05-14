import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Payment } from 'src/app/models/payments.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private readonly API_URL = environment.API_URL;

  constructor(private readonly httpClient: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`${this.API_URL}/tasks`).pipe(catchError((err) => throwError(err)));
  }

  filterPaymentsByUsername(filterString: string): Observable<Payment[]> {
    return this.httpClient
      .get<Payment[]>(`${this.API_URL}/tasks?username_like=${filterString}`)
      .pipe(catchError((err) => throwError(err)));
  }

  newPayment(payment: Payment): Observable<Payment> {
    return this.httpClient
      .post<Payment>(`${this.API_URL}/tasks`, payment)
      .pipe(catchError((err) => throwError(err)));
  }

  deletePayment(paymentId: number): Observable<{}> {
    return this.httpClient
      .delete<{}>(`${this.API_URL}/tasks/${paymentId}`)
      .pipe(catchError((err) => throwError(err)));
  }

  editPayment(payment: Payment): Observable<Payment> {
    return this.httpClient
      .put<Payment>(`${this.API_URL}/tasks/${payment.id}`, payment)
      .pipe(catchError((err) => throwError(err)));
  }
}
