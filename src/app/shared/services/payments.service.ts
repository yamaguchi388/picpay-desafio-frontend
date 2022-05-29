import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  rootPath = 'http://localhost:3000/tasks';
  constructor(private httpClient: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(this.rootPath);
  }

  getPaginatedPayments(page: number, limit: number): Observable<Payment[]> {
    const url = `${this.rootPath}?_page=${page}&_limit=${limit}`;
    return this.httpClient.get<Payment[]>(url);
  }
}
