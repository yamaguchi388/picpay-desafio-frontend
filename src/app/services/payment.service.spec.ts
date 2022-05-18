import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PaymentModel } from '../models/payment.model';

import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

  let paymentsDataStub = [
    {
      "id": 3,
      "name": "Crissie Summerill",
      "title": "VP Product Management",
      "value": 500,
      "date": "2020-02-09T18:20:32Z",
      "image": "https://robohash.org/natusinciduntsapiente.png?size=150x150&set=set1",
      "isPayed": true,
      "username": "crissum"
    },
    {
      "id": 4,
      "name": "Letitia Crolly",
      "username": "lcrolly3",
      "title": "Web Developer I",
      "value": 183.58,
      "date": "2021-07-10T20:39:48Z",
      "image": "https://robohash.org/estveniamet.png?size=150x150&set=set1",
      "isPayed": true
    },
    {
      "id": 5,
      "name": "Anthea Pundy",
      "username": "apundy4",
      "title": "Software Engineer III",
      "value": 177.19,
      "date": "2021-01-01T14:09:51Z",
      "image": "https://robohash.org/quiaautomnis.png?size=150x150&set=set1",
      "isPayed": true
    },
  ];

  const httpClientStub = {
    get: () => of(paymentsDataStub),
    post: () => of({}),
    put: () => of({}),
    delete: () => of({}),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientStub },
      ]
    });
    service = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call searchAllPayments method', () => {
    spyOn(httpClientStub, 'get').and.returnValues(of(paymentsDataStub));

    const allPayments = service.searchAllPayments();

    expect(httpClientStub.get).toHaveBeenCalled();

    allPayments.subscribe((p) => {
      expect(p).toBe(paymentsDataStub);
    });
  });

  describe('should call searchPaymentsPerPage method', () => {
    it('with page params', () => {
      spyOn(httpClientStub, 'get').and.returnValues(of(paymentsDataStub));

      const allPayments = service.searchPaymentsPerPage(7, 15);

      expect(httpClientStub.get).toHaveBeenCalled();

      allPayments.subscribe((p) => {
        expect(p).toBe(paymentsDataStub);
      });
    });

    it('without page params', () => {
      spyOn(httpClientStub, 'get').and.returnValues(of(paymentsDataStub));

      const allPayments = service.searchPaymentsPerPage();

      expect(httpClientStub.get).toHaveBeenCalled();

      allPayments.subscribe((p) => {
        expect(p).toBe(paymentsDataStub);
      });
    });
  });

  it('should call insertPayment method', () => {
    const response = {
      id: 171
    };
    spyOn(httpClientStub, 'post').and.returnValues(of(response));

    const request = {
      "name": "Andreia",
      "username": "deia",
      "value": "100",
      "date": "2022-05-06T03:00:00.000Z",
      "title": "teste",
      "image": null,
      "isPayed": false
    };

    const insertPayment = service.insertPayment(request);

    expect(httpClientStub.post).toHaveBeenCalled();
  });

  it('should call updatePayment method', () => {
    const response = {
      id: 171
    };
    spyOn(httpClientStub, 'put').and.returnValues(of(response));

    let request = new PaymentModel();
    request = {
      "name": "Andreia",
      "username": "deia",
      "value": 100,
      "date": "2022-05-06T03:00:00.000Z",
      "title": "teste",
      "image": null,
      "isPayed": false,
      "id": 171
    };

    const updatePayment = service.updatePayment(171, request);

    expect(httpClientStub.put).toHaveBeenCalled();
  });

  it('should call deletePayment method', () => {
    const response = {
      id: 171
    };
    spyOn(httpClientStub, 'delete').and.returnValues(of(response));

    const deletePayment = service.deletePayment(171);

    expect(httpClientStub.delete).toHaveBeenCalled();
  });

});
