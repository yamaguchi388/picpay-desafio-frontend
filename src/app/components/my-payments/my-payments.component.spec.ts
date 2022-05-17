import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PaymentModel } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { MyPaymentsComponent } from './my-payments.component';


describe('MyPaymentsComponent', () => {
  let componentMyPayments: MyPaymentsComponent;
  let fixture: ComponentFixture<MyPaymentsComponent>;
  const paymentServiceStub = {
    searchAllPayments: () => of({}),
    searchPaymentsPerPage: () => of({}),
    updatePayment: () => of({}),
  };
  const matDialogStub = {};
  const matSnackBarStub = {};
  const paymentsDataStub = [
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyPaymentsComponent],
      providers: [
        { provide: PaymentService, useValue: paymentServiceStub },
        { provide: MatDialog, useValue: matDialogStub },
        { provide: MatSnackBar, useValue: matSnackBarStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPaymentsComponent);
    componentMyPayments = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentMyPayments).toBeTruthy();
  });

  describe('should call ngAfterViewInit method', () => {
    it('with dataSource data', () => {
      componentMyPayments.dataSource = new MatTableDataSource<PaymentModel>(paymentsDataStub);
      componentMyPayments.ngAfterViewInit();
      expect(componentMyPayments.dataSource).toBeTruthy();
    });
    it('without dataSource data', () => {
      componentMyPayments.dataSource = null;
      componentMyPayments.ngAfterViewInit();
      expect(componentMyPayments.dataSource).toBeNull();
    });
  });

  it('should call searchPayments method', () => {
    const event = {
      pageIndex: 1,
      pageSize: 5
    };
    spyOn(paymentServiceStub, 'searchPaymentsPerPage').and.callFake(() => of({}));
    componentMyPayments.searchPayments(event);
    expect(paymentServiceStub.searchPaymentsPerPage).toHaveBeenCalled();
  });

  // describe('should call sortData method', () => {
  //   it('with sort is not active', () => {
  //     const sort = new MatSort();
  //     componentMyPayments.payments = paymentsDataStub;
  //     componentMyPayments.sortData(sort);
  //   });
  //   it('with sort direction  is empty', () => {
  //     const sort = new MatSort();
  //     componentMyPayments.payments = paymentsDataStub;
  //     componentMyPayments.sortData(sort);
  //   });
  //   it('with sort is not active and sort direction  is empty', () => {
  //     const sort = new MatSort();
  //     componentMyPayments.payments = paymentsDataStub;
  //     componentMyPayments.sortData(sort);
  //   });
  // });

  describe('should call compare method', () => {
    it('ascending order sorted data', () => {
      const a = 'Andressa';
      const b = 'Sophie';
      const isAsc = false;

      const compare = componentMyPayments.compare(a, b, isAsc);

      expect(compare).toEqual(1);
    });

    it('descending order not sorted data', () => {
      const a = 'Sophie';
      const b = 'Andressa';
      const isAsc = false;

      const compare = componentMyPayments.compare(a, b, isAsc);

      expect(compare).toEqual(-1);
    });

    it('ascending order with not sorted data', () => {
      const a = 'Sophie';
      const b = 'Andressa';
      const isAsc = true;

      const compare = componentMyPayments.compare(a, b, isAsc);

      expect(compare).toEqual(1);
    });
  });


});
