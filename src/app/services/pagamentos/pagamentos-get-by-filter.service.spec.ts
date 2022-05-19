import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IPagamento } from 'src/app/core/entities/entities.index';

import { PagamentosGetByFilterService } from './pagamentos-get-by-filter.service';

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

describe('PagamentosGetByFilterService', () => {
  let service: PagamentosGetByFilterService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ PagamentosGetByFilterService ]
    });
    service = TestBed.inject(PagamentosGetByFilterService);
    http = TestBed.inject(HttpClient);
  });

  it('Deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('Deve filtar os pagamentos apenas com usuario', () => {
    spyOn(http, 'get').and.returnValue(of(pagamento));
    service.getByFilters("Morganica O'Sheils").subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('Deve filtar os pagamentos usuario e se o pagamento esta feito', () => {
    spyOn(http, 'get').and.returnValue(of(pagamento));
    service.getByFilters("Morganica O'Sheils", null, null, null, null, true).subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('Deve filtar os pagamentos usuario e username', () => {
    spyOn(http, 'get').and.returnValue(of(pagamento));
    service.getByFilters("Morganica O'Sheils", "mosheils4p", null, null, null, null).subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });
  
  it('Deve filtar os pagamentos usuario, username e value', () => {
    spyOn(http, 'get').and.returnValue(of(pagamento));
    service.getByFilters("Morganica O'Sheils", "mosheils4p", 100, null, null, null).subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('Deve filtar os pagamentos usuario, username, value e data', () => {
    spyOn(http, 'get').and.returnValue(of(pagamento));
    service.getByFilters("Morganica O'Sheils", "mosheils4p", 100, null, '2021-05-05', null).subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('Deve filtar os pagamentos usuario, username, value, value e data', () => {
    spyOn(http, 'get').and.returnValue(of(pagamento));
    service.getByFilters("Morganica O'Sheils", "mosheils4p", 100, "Analyst Programmer", '2021-05-05', null).subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('Deve filtar os pagamentos com todos os filtros', () => {
    spyOn(http, 'get').and.returnValue(of(pagamento));
    service.getByFilters("Morganica O'Sheils", "mosheils4p", 100, "Analyst Programmer", '2021-05-05', true).subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });
});
