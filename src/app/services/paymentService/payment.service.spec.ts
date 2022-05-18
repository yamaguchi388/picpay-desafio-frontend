import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from 'src/app/models/task.model';

import { PaymentService } from './payment.service';

fdescribe('PaymentService', () => {
  let paymentService: PaymentService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpMock: HttpTestingController;

  const paymentsDummy: Task = {
    id: 1,
    name: 'Pennie Dumphries',
    username: 'pdumphries0',
    title: 'Dental Hygienist',
    value: 19.96,
    date: '2020-07-21T05:53:20Z',
    image:
      'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
    isPayed: true,
  };
  const httpClientStub = {
    get: () => of(paymentsDummy),
    post: () => of({}),
    put: () => of({}),
    delete: () => of({}),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useValue: httpClientStub },
      ]
    });
    paymentService = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(paymentService).toBeTruthy();
  });

  it('should call searchAllPayments method', () => {
    spyOn(httpClientStub, 'get').and.returnValues(of(paymentsDummy));

    const allPayments = paymentService.getPayments();

    expect(httpClientStub.get).toHaveBeenCalled();

    allPayments.subscribe((payments) => {
      expect(payments).toBe(paymentsDummy);
    });
  });

});
