import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  url = 'http://localhost:3000/tasks';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getPayments(): Observable<Task> {
    return this.httpClient.get<Task>(`${this.url}`);
  }

  public getPaymentById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.url}/${id}`);
  }

  public updatePayment(id: number, task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.url}/${id}`, task);
  }

  public deletePayment(id: number): Observable<Task> {
    return this.httpClient.delete<Task>(`${this.url}/${id}`);
  }

  public insertPayment(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.url}`, task);
  }

}
