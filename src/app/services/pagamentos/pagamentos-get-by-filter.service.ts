import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagamento } from 'src/app/core/entities/entities.index';
import { Base } from 'src/app/core/enums/entities.index';

@Injectable()
export class PagamentosGetByFilterService {

  constructor(private readonly http: HttpClient) { }
  
  getByFilters(name: string, username?: string, value?: number, title?: string, date?: string, isPayed?: boolean): Observable<IPagamento[]> {

    const usuario = username ? `&username=${username}` : '';
    const valor = value ? `&value=${value}` : '';
    const titulo = title ? `&title_like=${title}` : '';
    const data = date ? `&date_like=${date}` : '';
    const payed = isPayed ? `&isPayed=${isPayed}` : '';
    
    return this.http.get<IPagamento[]>(`${Base.URL_BASE}/tasks?name_like=${name}${usuario}${valor}${titulo}${data}${payed}`);
  }
}
