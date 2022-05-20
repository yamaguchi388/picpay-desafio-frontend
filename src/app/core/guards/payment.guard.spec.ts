/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaymentGuard } from './payment.guard';

describe('Service: PaymentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentGuard]
    });
  });

  it('should ...', inject([PaymentGuard], (paymentGuard: PaymentGuard) => {
    expect(paymentGuard).toBeTruthy();
  }));
});
