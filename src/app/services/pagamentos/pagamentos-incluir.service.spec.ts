import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IPagamentoIncluir } from 'src/app/core/entities/entities.index';

import { PagamentosIncluirService } from './pagamentos-incluir.service';

const pagamento: IPagamentoIncluir = {
  name: "Morganica O'Sheils",
  username: "mosheils4p",
  title: "Analyst Programmer",
  value: 207.4,
  date: "2021-05-05T10:22:13Z",
  isPayed: true
};

describe('PagamentosIncluirService', () => {
  let service: PagamentosIncluirService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ PagamentosIncluirService ]
    });
    service = TestBed.inject(PagamentosIncluirService);
    http = TestBed.inject(HttpClient);
  });

  it('Deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('Deve incluir um novo pagamento', () => {
    spyOn(http, 'post').and.returnValue(of(pagamento));
    service.incluir(pagamento).subscribe(() => {
      expect(http.post).toHaveBeenCalled();
    });
  });
});
