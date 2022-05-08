import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { InputModule } from 'src/app/shared/components/form/input/input.module';
import { TableSortModule } from 'src/app/shared/components/table-sort/table-sort.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { DeletePaymentDialogComponent } from './components/delete-payment-dialog/delete-payment-dialog.component';
import { NewPaymentDialogComponent } from './components/new-payment-dialog/new-payment-dialog.component';
import { IPaginator, IPayment } from './interfaces';

import { PaymentsComponent } from './payments.component';
import { PaymentsService } from './services/payments/payments.service';

const mockPayments: IPaginator<IPayment[]> = {
  page: 1,
  limit: 5,
  total: 6,
  items: [
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
  ],
};

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;
  let paymentsService: PaymentsService;
  let toastrService: ToastrService;
  let httpService: HttpService;
  let matDialog: MatDialog;
  const matDialogRef = { close: () => {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        InputModule,
        NoopAnimationsModule,
        TableSortModule,
      ],
      declarations: [
        PaymentsComponent,
        NewPaymentDialogComponent,
        DeletePaymentDialogComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    paymentsService = TestBed.inject(PaymentsService);
    matDialog = TestBed.inject(MatDialog);
    toastrService = TestBed.inject(ToastrService);
    httpService = TestBed.inject(HttpService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all payments when page is initialized', () => {
    spyOn(paymentsService, 'index').and.callFake(() => of(mockPayments));

    component.ngAfterViewInit();

    fixture.detectChanges();

    expect(component.payments.items.length).toEqual(mockPayments.items.length);

    const rows = fixture.nativeElement.querySelectorAll('.mat-row');
    expect(rows.length).toEqual(component.payments.items.length);

    expect(paymentsService.index).toHaveBeenCalled();
    expect(paymentsService.index).toHaveBeenCalledTimes(1);
  });

  it('should load payments when user filter for username', fakeAsync(() => {
    spyOn(paymentsService, 'index').and.callFake(() => of(mockPayments));

    component.ngAfterViewInit();

    fixture.detectChanges();

    const filterInput = fixture.nativeElement.querySelector(
      'input[id=\'filter-input\']'
    );
    filterInput.value = 'dummy name';
    filterInput.dispatchEvent(new Event('input'));

    tick(800);

    fixture.detectChanges();

    expect(paymentsService.index).toHaveBeenCalled();
    expect(paymentsService.index).toHaveBeenCalledTimes(2);
    expect(paymentsService.index).toHaveBeenCalledWith(
      1,
      5,
      component.filterForm.getRawValue()
    );
  }));

  it('should open new payment dialog when user click on adicionar novo pagamento button', () => {
    spyOn(matDialog, 'open');

    component.ngAfterViewInit();
    fixture.detectChanges();

    const addNewPaymentButton = fixture.nativeElement.querySelector(
      'button[id=\'add-new-payment-button\']'
    );

    addNewPaymentButton.click();

    fixture.detectChanges();

    expect(matDialog.open).toHaveBeenCalled();
    expect(matDialog.open).toHaveBeenCalledOnceWith(NewPaymentDialogComponent, {
      width: '70%',
      maxHeight: '500px',
      height: 'auto',
      data: undefined,
    });
  });

  it('should open new payment dialog when user click on adicionar novo pagamento button', () => {
    spyOn(matDialog, 'open');

    component.ngAfterViewInit();
    fixture.detectChanges();

    const addNewPaymentButton = fixture.nativeElement.querySelector(
      'button[id=\'add-new-payment-button\']'
    );

    addNewPaymentButton.click();

    fixture.detectChanges();

    expect(matDialog.open).toHaveBeenCalled();
    expect(matDialog.open).toHaveBeenCalledOnceWith(NewPaymentDialogComponent, {
      width: '70%',
      maxHeight: '500px',
      height: 'auto',
      data: undefined,
    });
  });

  it('should call store method and save new payment', () => {
    const mockPayment: any = {
      name: 'Bathsheba Eschelle',
      username: 'bescheller',
      title: 'Health Coach II',
      value: 247.23,
      date: '2020-03-14T14:49:39Z',
      image: 'https://robohash.org/autettempora.png?size=150x150&set=set1',
      isPayed: true,
    };

    spyOn(paymentsService, 'index').and.callFake(() => of(mockPayments));
    spyOn(toastrService, 'success');
    spyOn(httpService, 'post').and.callFake(() => of(mockPayment));

    component.ngAfterViewInit();
    fixture.detectChanges();

    component.store(mockPayment);

    fixture.detectChanges();

    expect(toastrService.success).toHaveBeenCalled();
    expect(httpService.post).toHaveBeenCalledTimes(1);
    expect(httpService.post).toHaveBeenCalledWith('tasks', mockPayment);
    expect(component.payments.items.length).toEqual(6);
  });

  it('should call update method', () => {
    const mockPayment: any = {
      id: 1,
      name: 'Bathsheba Eschelle',
      username: 'bescheller',
      title: 'Health Coach II',
      value: 247.23,
      date: '2020-03-14T14:49:39Z',
      image: 'https://robohash.org/autettempora.png?size=150x150&set=set1',
      isPayed: true,
    };

    spyOn(paymentsService, 'index').and.callFake(() => of(mockPayments));
    spyOn(toastrService, 'success');
    spyOn(httpService, 'put').and.callFake(() => of(mockPayment));

    component.ngAfterViewInit();
    fixture.detectChanges();

    component.update(mockPayment);

    fixture.detectChanges();

    expect(toastrService.success).toHaveBeenCalled();
    expect(httpService.put).toHaveBeenCalledTimes(1);
    expect(component.payments.items.length).toEqual(6);
  });

  it('should open delete payment dialog when user click on delete icon in payments table', () => {
    spyOn(matDialog, 'open');
    spyOn(paymentsService, 'index').and.callFake(() => of(mockPayments));

    component.ngAfterViewInit();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('.mat-row');
    const row = rows[1];

    const [_, deleteButton] = row.querySelectorAll('img');

    deleteButton.click();

    fixture.detectChanges();

    expect(matDialog.open).toHaveBeenCalled();
    expect(matDialog.open).toHaveBeenCalledOnceWith(
      DeletePaymentDialogComponent,
      {
        width: '405px',
        maxHeight: '325pxpx',
        data: {
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
      }
    );
  });

  it('should call delete payment method', () => {
    const mockPayment: any = {
      id: 1,
      name: 'Bathsheba Eschelle',
      username: 'bescheller',
      title: 'Health Coach II',
      value: 247.23,
      date: '2020-03-14T14:49:39Z',
      image: 'https://robohash.org/autettempora.png?size=150x150&set=set1',
      isPayed: true,
    };

    spyOn(paymentsService, 'index').and.callFake(() => of({ ...mockPayments }));
    spyOn(toastrService, 'success');
    spyOn(httpService, 'delete').and.returnValue(of());

    component.ngAfterViewInit();

    fixture.detectChanges();

    component.delete(mockPayment);

    fixture.detectChanges();

    expect(httpService.delete).toHaveBeenCalledTimes(1);
  });
});
