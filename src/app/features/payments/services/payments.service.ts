import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';

let baseUrl: string = 'http://localhost:3000/tasks';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Payment[]> {
    return this.http.get<Payment[]>(baseUrl);
  }

  getPaginated(page: number, limit: number, name?: string): Observable<any> {
    let paginationRulesUrlPath: string = '';
    paginationRulesUrlPath = name? '?name_like=' + name + '&_page=' + page + '&_limit=' + limit : '?_page=' + page + '&_limit=' + limit;

    return this.http.get(baseUrl + paginationRulesUrlPath, {observe: 'response'});
  }

  create(payment: Payment): Observable<any> {
    return this.http.post(baseUrl, payment);
  }

  update(payment: Payment): Observable<any> {
    return this.http.put(`${baseUrl}/${payment.id}`, payment);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
