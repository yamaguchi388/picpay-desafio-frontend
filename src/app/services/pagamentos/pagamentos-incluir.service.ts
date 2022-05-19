import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagamentoIncluir } from 'src/app/core/entities/entities.index';
import { Base } from 'src/app/core/enums/entities.index';

@Injectable()
export class PagamentosIncluirService {

  constructor(private readonly http: HttpClient) { }
  
  incluir(pagamento: IPagamentoIncluir): Observable<Object> {
    return this.http.post(`${Base.URL_BASE}/tasks`, pagamento);
  }
}
