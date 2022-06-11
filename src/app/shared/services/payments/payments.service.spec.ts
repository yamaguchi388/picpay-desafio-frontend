import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { PaymentModel } from './../../models/payment.model';
import { PaymentsService } from './payments.service';
import { environment } from 'src/environments/environment';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentsService]
    });
    service = TestBed.inject(PaymentsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('createPayments', () => {
    it('makes expected calls', () => {
      const paymentModelStub: PaymentModel = {
        "name": "Daniel Miquiles",
        "username": "daniellreal",
        "title": "Boleto 5",
        "value": 44.43,
        "date": "2022-05-25T12:38",
        "image": "",
        "isPayed": true,
        "id": 176
      };
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.createPayments(paymentModelStub).subscribe(res => {
        expect(res).toEqual(paymentModelStub);
      });
      const req = httpTestingController.expectOne(environment.payments_url);
      expect(req.request.method).toEqual('POST');
      req.flush(paymentModelStub);
      // tick(10);
      // tick();
      // httpTestingController.verify();
    });
  });

  describe('editPayments', () => {
    it('makes expected calls', () => {
      const paymentModelStub: PaymentModel = {
        "name": "Daniel Miquiles",
        "username": "daniellreal",
        "title": "Boleto 5",
        "value": 44.43,
        "date": "2022-05-25T12:38",
        "image": "",
        "isPayed": true,
        "id": 176
      };
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.editPayments(paymentModelStub).subscribe(res => {
        expect(res).toEqual(paymentModelStub);
      });
      const req = httpTestingController.expectOne(environment.payments_url + '/176');
      expect(req.request.method).toEqual('PUT');
      req.flush(paymentModelStub);
      // httpTestingController.verify();
    });
  });
});
