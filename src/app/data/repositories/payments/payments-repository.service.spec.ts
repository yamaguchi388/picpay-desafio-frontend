import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PaymentsRepositoryService } from './payments-repository.service';

describe('PaymentsRepositoryService', () => {
  let service: PaymentsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(PaymentsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
