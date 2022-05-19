import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IPagamentoAlterar } from 'src/app/core/entities/entities.index';

import { PagamentoAlterarService } from './pagamento-alterar.service';

const pagamento: IPagamentoAlterar = {
  id: 0,
  name: "Morganica O'Sheils",
  username: "mosheils4p",
  title: "Analyst Programmer",
  value: 207.4,
  date: "2021-05-05T10:22:13Z",
  isPayed: true
}

describe('PagamentoAlterarService', () => {
  let service: PagamentoAlterarService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ PagamentoAlterarService ]
    });
    service = TestBed.inject(PagamentoAlterarService);
    http = TestBed.inject(HttpClient);
  });

  it('Deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('Deve alterar o pagamento', () => {
    spyOn(http, 'put').and.returnValue(of(pagamento));
    service.alterar(pagamento).subscribe(() => {
      expect(http.put).toHaveBeenCalled();
    });
  });
});
