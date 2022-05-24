import { TestBed } from '@angular/core/testing';

import { MeusPagamentosResolver } from './meus-pagamentos.resolver';

describe('MeusPagamentosResolver', () => {
  let resolver: MeusPagamentosResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MeusPagamentosResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
