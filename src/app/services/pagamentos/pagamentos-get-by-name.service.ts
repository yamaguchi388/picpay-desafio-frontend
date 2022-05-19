import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagamento } from 'src/app/core/entities/entities.index';
import { Base } from 'src/app/core/enums/entities.index';

@Injectable()
export class PagamentosGetByNameService {

  constructor(private readonly http: HttpClient) { }
  
  getByName(name: string): Observable<IPagamento[]> {
    return this.http.get<IPagamento[]>(`${Base.URL_BASE}/tasks?name_like=${name}`);
  }
}
