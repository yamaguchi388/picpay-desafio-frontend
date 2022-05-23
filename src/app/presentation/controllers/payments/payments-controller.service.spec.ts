import { TestBed } from '@angular/core/testing';

import { PaymentsControllerService } from './payments-controller.service';

describe('PaymentsControllerService', () => {
  let service: PaymentsControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PaymentsControllerService, useValue: PaymentsControllerService }
      ]
    });
    service = TestBed.inject(PaymentsControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
