import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Payment } from 'src/app/data/models/payments.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private readonly API_URL = environment.API_URL;

  constructor(private readonly httpClient: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`${this.API_URL}/tasks`).pipe(catchError((err) => throwError(() => new Error(err))));
  }

  newPayment(payment: Payment): Observable<Payment> {
    return this.httpClient.post<Payment>(`${this.API_URL}/tasks`, payment).pipe(catchError((err) => throwError(() => new Error(err))));
  }
}
