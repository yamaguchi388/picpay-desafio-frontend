import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PaymentsService } from './payments.service';

const mockPayment = {
  id: 300,
  name: 'Alex Alexandrino',
  username: 'alex_o',
  title: 'Almoço',
  value: 12.10,
  date: '2020-05-23T00:00:00Z',
  image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
  isPayed: false,
};

const getPaymentsParams = {
  page: 1,
  limit: 10,
  sort: 'date',
  order: 'desc'
};

describe('PaymentsService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: PaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new PaymentsService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get payments', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of([mockPayment]));

    service.getPayments(getPaymentsParams).subscribe({
      next: payments => {
        expect(payments).withContext('expected payments').toEqual([mockPayment]);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should add a payment', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(mockPayment));

    service.addPayment(mockPayment).subscribe({
      next: payment => {
        expect(payment).withContext('expected payment').toEqual(mockPayment);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });

  it('should add a payment', (done: DoneFn) => {
    httpClientSpy.put.and.returnValue(of(mockPayment));

    service.updatePayment(mockPayment).subscribe({
      next: payment => {
        expect(payment).withContext('expected payment').toEqual(mockPayment);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.put.calls.count()).withContext('one call').toBe(1);
  });

  it('should add a payment', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(of({}));

    service.deletePayment(mockPayment.id).subscribe({
      next: response => {
        expect(response).withContext('expected payment').toEqual({});
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.delete.calls.count()).withContext('one call').toBe(1);
  });
});
