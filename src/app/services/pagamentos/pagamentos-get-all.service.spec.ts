import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { IPagamento } from 'src/app/core/entities/entities.index';

import { PagamentosGetAllService } from './pagamentos-get-all.service';

const pagamento: IPagamento[] = [{
  id: 170,
  name:  "Morganica O'Sheils",
  username: "mosheils4p",
  title: "Analyst Programmer",
  value: 207.4,
  date: "2021-05-05T10:22:13Z",
  image: "https://robohash.org/illumexpeditadeleniti.png?size=150x150&set=set1",
  isPayed: true
}];

describe('PagamentosGetAllService', () => {
  let service: PagamentosGetAllService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ PagamentosGetAllService ]
    });
    service = TestBed.inject(PagamentosGetAllService);
    http = TestBed.inject(HttpClient);
  });

  it('Deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('Deve consultar todos os pagamentos', () => {
    spyOn(http, 'get').and.returnValue(of(pagamento));
    service.getAll().subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('Deve consultar o total de registros', () => {
    spyOn(http, 'get').and.returnValue(of(170));
    service.getTotal().subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('Deve consultar o total de registros', () => {
    spyOn(http, 'get').and.returnValue(of(pagamento));
    service.next(2, 10).subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });
});
