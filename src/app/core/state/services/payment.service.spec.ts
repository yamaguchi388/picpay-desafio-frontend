/* eslint-disable no-undef */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaymentService } from './payment.service';
import { TestBed } from '@angular/core/testing';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
