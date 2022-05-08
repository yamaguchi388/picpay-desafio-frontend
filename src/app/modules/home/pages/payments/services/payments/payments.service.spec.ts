import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { IFilterParams, IPayment } from '../../interfaces';

import { PaymentsService } from './payments.service';

const mockPayments: IPayment[] = [
  {
    id: 19,
    name: 'Bruce Martyn',
    username: 'bmartyni',
    title: 'Structural Analysis Engineer',
    value: 201.28,
    date: '2021-02-15T18:14:35',
    image: 'https://robohash.org/dolorautest.png?size=150x150&set=set1',
    isPayed: true,
  },
  {
    id: 21,
    name: 'Verla Feedham',
    username: 'vfeedhamk',
    title: 'Computer Systems Analyst II',
    value: 475.46,
    date: '2021-04-22T17:05:48Z',
    image:
      'https://robohash.org/eligendidebitisquibusdam.png?size=150x150&set=set1',
    isPayed: false,
  },
  {
    id: 22,
    name: 'Alicia Laybourne',
    username: 'alaybournel',
    title: 'Staff Accountant IV',
    value: 105.78,
    date: '2020-08-24T22:09:07',
    image:
      'https://robohash.org/doloremquedoloresprovident.png?size=150x150&set=set1',
    isPayed: false,
  },
  {
    id: 23,
    name: 'Tabbatha Kleinbaum',
    username: 'tkleinbaumm',
    title: 'Analyst Programmer',
    value: 123.02,
    date: '2020-05-10T23:59:44Z',
    image: 'https://robohash.org/harumquibusdamet.png?size=150x150&set=set1',
    isPayed: true,
  },
  {
    id: 24,
    name: 'Cortie Averill',
    username: 'caverilln',
    title: 'Recruiter',
    value: 267.08,
    date: '2021-03-04T07:30:51Z',
    image:
      'https://robohash.org/doloremqueconsequaturfugit.png?size=150x150&set=set1',
    isPayed: true,
  },
];

describe('PaymentsService', () => {
  let service: PaymentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PaymentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all payments when method index is called without params', () => {
    service.index().subscribe((result) => {
      expect(result.page).toEqual(1);
      expect(result.limit).toEqual(10);
      expect(result.items).toEqual(mockPayments);
    });

    const mockReq = httpMock.expectOne(
      `${environment.apiUrl}/tasks?_page=1&_limit=10`
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.method).toEqual('GET');

    mockReq.flush(mockPayments);

    httpMock.verify();
  });

  it('should return payments with username equal filter', () => {
    const filter: IFilterParams = {
      key: 'username',
      value: 'username',
    };

    service.index(1, 10, filter).subscribe((result) => {
      expect(result.page).toEqual(1);
      expect(result.limit).toEqual(10);
      expect(result.items).toEqual(mockPayments);
    });

    const mockReq = httpMock.expectOne(
      `${environment.apiUrl}/tasks?_page=1&_limit=10&username=username`
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.method).toEqual('GET');

    mockReq.flush(mockPayments);

    httpMock.verify();
  });

  it('should store new payment with isPayed false', () => {
    const payment: any = {
      name: 'Dummy name',
      username: 'dmyname',
      title: 'Mock titulo',
      value: 201.28,
      date: '2021-02-15T18:14:35',
      image: 'https://robohash.org/dolorautest.png?size=150x150&set=set1',
    };

    service.store(payment).subscribe((result) => {
      expect(result.isPayed).toBeFalsy();
    });

    const mockReq = httpMock.expectOne(`${environment.apiUrl}/tasks`);

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.method).toEqual('POST');

    mockReq.flush(payment);

    httpMock.verify();
  });

  it('should update a payment that exists in the database', () => {
    const payment: any = {
      id: 1,
      name: 'Dummy name',
      username: 'dmyname',
      title: 'Mock titulo',
      value: 201.28,
      date: '2021-02-15T18:14:35',
      image: 'https://robohash.org/dolorautest.png?size=150x150&set=set1',
      isPayed: true,
    };

    service.update(payment).subscribe((result) => {
      expect(result).toEqual(payment);
    });

    const mockReq = httpMock.expectOne(
      `${environment.apiUrl}/tasks/${payment.id}`
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.method).toEqual('PUT');

    mockReq.flush(payment);

    httpMock.verify();
  });

  it('should delete a payment that exists in the database', () => {
    const payment: any = {
      id: 1,
    };

    service.delete(payment).subscribe();

    const mockReq = httpMock.expectOne(
      `${environment.apiUrl}/tasks/${payment.id}`
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.method).toEqual('DELETE');

    httpMock.verify();
  });
});
