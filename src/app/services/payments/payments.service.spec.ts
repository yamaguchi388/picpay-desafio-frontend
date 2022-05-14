import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let paymentsService: PaymentsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpMock: HttpTestingController;
  const mockPayments = [
    {
      id: 3,
      name: 'Crissie Summerill',
      username: 'csummerill2',
      title: 'VP Product Management',
      value: 464.54,
      date: '2020-02-09T18:20:32Z',
      image: 'https://robohash.org/natusinciduntsapiente.png?size=150x150&set=set1',
      isPayed: false,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    paymentsService = TestBed.inject(PaymentsService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(paymentsService).toBeTruthy();
  });

  it('should get payments', () => {
    httpClientSpy.get.and.returnValue(of(mockPayments));

    paymentsService.getPayments().subscribe((payments) => {
      expect(payments).withContext('getting payments').toEqual(mockPayments);
    });
  });

  it('should call get payments with error', () => {
    let errorHappened;

    paymentsService.getPayments().subscribe(
      () => {},
      () => {
        errorHappened = true;
      },
    );

    const req = httpMock.expectOne(`${environment.API_URL}/tasks`);
    req.flush('', { status: 404, statusText: 'Not Found' });

    expect(errorHappened).toBeTrue();
  });

  it('should filterPaymentsByUsername', () => {
    httpClientSpy.get.and.returnValue(of(mockPayments));

    paymentsService.filterPaymentsByUsername('csummerill2').subscribe((payments) => {
      expect(payments).withContext('filtering payments').toEqual(mockPayments);
    });
  });

  it('should call filterPaymentsByUsername with error', () => {
    const filterString = 'username';
    let errorHappened;

    paymentsService.filterPaymentsByUsername(filterString).subscribe(
      () => {},
      () => {
        errorHappened = true;
      },
    );

    const req = httpMock.expectOne(`${environment.API_URL}/tasks?username_like=${filterString}`);
    req.flush('', { status: 404, statusText: 'Not Found' });

    expect(errorHappened).toBeTrue();
  });

  it('should newPayment', () => {
    httpClientSpy.post.and.returnValue(of(mockPayments[0]));

    paymentsService.newPayment(mockPayments[0]).subscribe((payment) => {
      expect(payment).withContext('creating payments').toEqual(mockPayments[0]);
    });
  });

  it('should call newPayment with error', () => {
    let errorHappened;

    paymentsService.newPayment(mockPayments[0]).subscribe(
      () => {},
      () => {
        errorHappened = true;
      },
    );

    const req = httpMock.expectOne(`${environment.API_URL}/tasks`);
    req.flush('', { status: 404, statusText: 'Not Found' });

    expect(errorHappened).toBeTrue();
  });

  it('should deletePayment', () => {
    httpClientSpy.delete.and.returnValue(of({}));

    paymentsService.deletePayment(mockPayments[0].id).subscribe((response) => {
      expect(response).withContext('delete payment').toEqual({});
    });
  });

  it('should call deletePayment with error', () => {
    const paymentId = mockPayments[0].id;
    let errorHappened;

    paymentsService.deletePayment(paymentId).subscribe(
      () => {},
      () => {
        errorHappened = true;
      },
    );

    const req = httpMock.expectOne(`${environment.API_URL}/tasks/${paymentId}`);
    req.flush('', { status: 404, statusText: 'Not Found' });

    expect(errorHappened).toBeTrue();
  });

  it('should editpayment', () => {
    httpClientSpy.put.and.returnValue(of(mockPayments[0]));

    paymentsService.editPayment(mockPayments[0]).subscribe((payment) => {
      expect(payment).withContext('editing payments').toEqual(mockPayments[0]);
    });
  });

  it('should call editpayment with error', () => {
    const payment = mockPayments[0];
    let errorHappened;

    paymentsService.editPayment(payment).subscribe(
      () => {},
      () => {
        errorHappened = true;
      },
    );

    const req = httpMock.expectOne(`${environment.API_URL}/tasks/${payment.id}`);
    req.flush('', { status: 404, statusText: 'Not Found' });

    expect(errorHappened).toBeTrue();
  });
});
