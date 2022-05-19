import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PagamentosDeleteByUdService } from './pagamentos-delete-by-id.service';

describe('PagamentosDeleteByUdService', () => {
  let service: PagamentosDeleteByUdService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ PagamentosDeleteByUdService ]
    });
    service = TestBed.inject(PagamentosDeleteByUdService);
    http = TestBed.inject(HttpClient);
  });

  it('Deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('Deve excluir o pagamento', () => {
    spyOn(http, 'delete').and.returnValue(of(0));
    service.excluir(0).subscribe(() => {
      expect(http.delete).toHaveBeenCalled();
    });
  });
});
