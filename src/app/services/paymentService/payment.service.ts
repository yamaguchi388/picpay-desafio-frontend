import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from "src/app/models/task.model";

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
}
