import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagamento } from 'src/app/core/entities/entities.index';
import { Base } from 'src/app/core/enums/entities.index';

@Injectable()
export class PagamentosGetAllService {

  private page = 1;

  constructor(private readonly http: HttpClient) { }
  
  getAll(): Observable<IPagamento[]> {
    return this.http.get<IPagamento[]>(`${Base.URL_BASE}/tasks?_page=${this.page}`);
  }

  getTotal(): Observable<HttpResponse<Response>> {
    return this.http.get<HttpResponse<Response>>(`${Base.URL_BASE}/tasks?_page=${this.page}`, {observe: 'response' as 'body'});
  }

  next(page: number, limit: number): Observable<IPagamento[]> {
    return this.http.get<IPagamento[]>(`${Base.URL_BASE}/tasks?_page=${page}&_limit=${limit}`);
  }

}
