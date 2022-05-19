import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagamentoAlterar } from 'src/app/core/entities/entities.index';
import { Base } from 'src/app/core/enums/entities.index';

@Injectable()
export class PagamentoAlterarService {

  constructor(private readonly http: HttpClient) { }
  
  alterar(pagamento: IPagamentoAlterar): Observable<Object> {
    return this.http.put(`${Base.URL_BASE}/tasks/${pagamento.id}`, pagamento);
  }
}
