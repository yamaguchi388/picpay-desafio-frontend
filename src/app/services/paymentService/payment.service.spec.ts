import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from 'src/app/models/task.model';

import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let paymentService: PaymentService;

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

  it('should call get payments method', () => {
    spyOn(httpClientStub, 'get').and.returnValues(of(paymentsDummy));

    const allPayments = paymentService.getPayments();

    expect(httpClientStub.get).toHaveBeenCalled();

    allPayments.subscribe((payments) => {
      expect(payments).toBe(paymentsDummy);
    });
  });

  it('should call insertPayment method', () => {
    const response = {
      id: 171
    };
    spyOn(httpClientStub, 'post').and.returnValues(of(response));

    const request = {
      id: 171,
      name: 'Fernando',
      username: 'tchfer',
      value: 100.0,
      date: '2022-05-18',
      title: 'Dev',
      image: null,
      isPayed: false
    };

    paymentService.insertPayment(request);

    expect(httpClientStub.post).toHaveBeenCalled();
  });

  it('should call updatePayment method', () => {
    const response = {
      id: 171
    };
    spyOn(httpClientStub, 'put').and.returnValues(of(response));

    const request: Task = {
      id: 171,
      name: 'Fernando',
      username: 'tchfer',
      value: 100.0,
      date: '2022-05-18',
      title: 'Dev',
      image: null,
      isPayed: false
    };

    const updatePayment = paymentService.updatePayment(171, request);

    expect(httpClientStub.put).toHaveBeenCalled();
  });

  it('should call deletePayment method', () => {
    const response = {
      id: 171
    };
    spyOn(httpClientStub, 'delete').and.returnValues(of(response));

    const deletePayment = paymentService.deletePayment(171);

    expect(httpClientStub.delete).toHaveBeenCalled();
  });

  it('should call getPaymentById method', () => {
    spyOn(httpClientStub, 'get').and.returnValues(of(paymentsDummy));
    paymentService.getPaymentById(171);
    expect(httpClientStub.get).toHaveBeenCalled();
  });

});
