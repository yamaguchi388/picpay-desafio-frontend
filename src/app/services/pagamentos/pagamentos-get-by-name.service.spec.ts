import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IPagamento } from 'src/app/core/entities/entities.index';

import { PagamentosGetByNameService } from './pagamentos-get-by-name.service';

const pagamento: IPagamento[] = [{
  id: 0,
  name: "Morganica O'Sheils",
  username: "mosheils4p",
  title: "Analyst Programmer",
  value: 207.4,
  date: "2021-05-05T10:22:13Z",
  image: "https://robohash.org/illumexpeditadeleniti.png?size=150x150&set=set1",
  isPayed: true
}];

describe('PagamentosGetByNameService', () => {
  let service: PagamentosGetByNameService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ PagamentosGetByNameService ]
    });
    service = TestBed.inject(PagamentosGetByNameService);
    http = TestBed.inject(HttpClient);
  });

  it('Deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('Deve filtar os pagamentos por usuario', () => {
    spyOn(http, 'get').and.returnValue(of(pagamento));
    service.getByName("Morganica O'Sheils").subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });
});
