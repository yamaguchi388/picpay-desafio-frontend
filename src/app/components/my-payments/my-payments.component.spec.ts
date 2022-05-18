import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { ActionEnum } from 'src/app/enums/action.enum';
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
  const matDialogStub = {
    open: () => {
      return {
        afterClosed: () => of({}),
      }
    },
  };
  const matSnackBarStub = {
    open: () => { },
  };
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


  it('should call insertPayment method', () => {
    const action = ActionEnum.INSERT;
    spyOn(componentMyPayments, 'openDialog').and.callThrough();
    spyOn(matDialogStub, 'open').and.callThrough();

    componentMyPayments.insertPayment();

    expect(componentMyPayments.openDialog).toHaveBeenCalled();
    expect(matDialogStub.open).toHaveBeenCalled();
  });

  it('should call editPayment method', () => {
    const action = ActionEnum.UPDATE;
    const payment = paymentsDataStub[0];
    spyOn(componentMyPayments, 'openDialog').and.callThrough();
    spyOn(matDialogStub, 'open').and.callThrough();

    componentMyPayments.editPayment(payment);

    expect(componentMyPayments.openDialog).toHaveBeenCalled();
    expect(matDialogStub.open).toHaveBeenCalled();
  });


  it('should call deletePayment method', () => {
    const action = ActionEnum.UPDATE;
    const payment = paymentsDataStub[1];
    componentMyPayments.dataSource = new MatTableDataSource<PaymentModel>(paymentsDataStub);
    const index = componentMyPayments.dataSource.data.indexOf(payment, 0);
    spyOn(componentMyPayments, 'openDialog').and.callThrough();
    spyOn(matDialogStub, 'open').and.callThrough();

    componentMyPayments.deletePayment(payment);

    expect(componentMyPayments.openDialog).toHaveBeenCalled();
    expect(matDialogStub.open).toHaveBeenCalled();
  });


  it('should call updatePaidValue method', () => {
    const action = ActionEnum.UPDATE;
    const payment = paymentsDataStub[1];
    componentMyPayments.dataSource = new MatTableDataSource<PaymentModel>(paymentsDataStub);
    const index = componentMyPayments.dataSource.data.indexOf(payment, 0);
    spyOn(paymentServiceStub, 'updatePayment').and.callFake(() => of({}));
    spyOn(componentMyPayments, 'openSnackBar').and.callThrough();
    spyOn(matSnackBarStub, 'open').and.callThrough();

    componentMyPayments.updatePaidValue(payment);

    expect(paymentServiceStub.updatePayment).toHaveBeenCalled();
    expect(componentMyPayments.openSnackBar).toHaveBeenCalled();
    expect(matSnackBarStub.open).toHaveBeenCalled();
  });

  describe('should call filterPaymentsData method', () => {
    it('with filterData', () => {
      componentMyPayments.filterData = 'Andreia';

      componentMyPayments.filterPaymentsData();

      expect(componentMyPayments.dataSource.filter).toEqual(componentMyPayments.filterData);
    });
    it('without filterData', () => {
      componentMyPayments.filterData = undefined;
      spyOn(matSnackBarStub, 'open').and.callThrough();

      componentMyPayments.filterPaymentsData();

      expect(componentMyPayments.dataSource.filter).toEqual('');
      expect(matSnackBarStub.open).toHaveBeenCalled();
    });
  });




});
