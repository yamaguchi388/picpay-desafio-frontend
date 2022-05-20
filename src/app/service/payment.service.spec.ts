import { PaymentObject } from './../models/payment-object';
import { HttpClient, HttpParams } from '@angular/common/http';
/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { PaymentService } from './payment.service';
import { environment } from './../../environments/environment';

describe('Service: Payment', () => {

  let service: PaymentService;
  let http: HttpClient;
  let params: HttpParams;
  let api: string
  let payment: PaymentObject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService]
    });
    service = TestBed.inject(PaymentService);
    http = TestBed.inject(HttpClient);
    api = `${environment.api}/tasks`;
    payment = {
      "date": "2022-05-17T03:00:00.000Z",
      "id": 175,
      "image": null,
      "isPayed": false,
      "name": "Brenda",
      "username": "Brenda",
      "value": 23.66,
      "title": "Design"
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have as currentPage 1', () => {
    expect(service.api).toEqual(api);
  });

  it('should call GET on the correct API endpoint', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.getPayment(params);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(api, Object({ params, observe: 'response' }));
  });

  it('should call PUT on the correct API endpoint', () => {
    const spy = spyOn(http, 'put').and.callThrough();
    service.putPayment(payment);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`${api}/${payment.id}`, payment);
  });

  it('should call POST on the correct API endpoint', () => {
    const spy = spyOn(http, 'post').and.callThrough();
    service.postPayment(payment);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(api, payment);
  });

  it('should call DELETE on the correct API endpoint', () => {
    const spy = spyOn(http, 'delete').and.callThrough();
    service.deletePayment(payment.id);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(`${api}/${payment.id}`);
  });

});
