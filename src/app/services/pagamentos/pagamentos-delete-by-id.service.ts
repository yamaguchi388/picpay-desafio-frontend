import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from 'src/app/core/enums/entities.index';

@Injectable()
export class PagamentosDeleteByUdService {

  constructor(private readonly http: HttpClient) { }
  
  excluir(pagamentoId: number): Observable<Object> {
    return this.http.delete(`${Base.URL_BASE}/tasks/${pagamentoId}`);
  }
}
