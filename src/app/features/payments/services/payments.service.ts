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

  getPaginated(page: number, limit: number): Observable<any> {
    let paginationRulesUrlPath: string = '';
    paginationRulesUrlPath = '?_page=' + page + '&_limit=' + limit;

    return this.http.get(baseUrl + paginationRulesUrlPath, {observe: 'response'});
  }
}
