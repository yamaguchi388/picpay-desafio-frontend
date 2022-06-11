import { NewPaymentsComponent } from './../../new-payments/new-payments/new-payments.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateService } from './../../../shared/services/date/date.service';
import { PaymentModel } from './../../../shared/models/payment.model';
import { DialogService } from './../../../shared/services/dialog/dialog.service';
import { PaymentsService } from './../../../shared/services/payments/payments.service';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { PaymentsComponent } from './payments.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(() => {
    const dateServiceStub = () => ({ formatDate: date => ({}) });
    const dialogServiceStub = () => ({ getErrors: error => ({}) });
    const paymentsServiceStub = () => ({
      getPayments: (currentPage, limitItens, user) => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    const matDialogStub = () => ({ 
      open: any => ({}),
      afterClosed: () => ({ subscribe: () => ({}) })
    });
    const matDialogRefStub = () => ({ 
      open: any => ({}),
      afterClosed: () => ({ subscribe: () => ({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PaymentsComponent],
      providers: [
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: DateService, useFactory: dateServiceStub },
        { provide: DialogService, useFactory: dialogServiceStub },
        { provide: PaymentsService, useFactory: paymentsServiceStub },
        { provide: MatDialog, useFactory: matDialogStub }
      ]
    });
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`currentPage has default value`, () => {
    expect(component.currentPage).toEqual(1);
  });

  it(`limitItens has default value`, () => {
    expect(component.limitItens).toEqual(`5`);
  });

  it(`hide has default value`, () => {
    expect(component.hide).toEqual(true);
  });

  it(`openDialogNewPayment has default value`, () => {
    expect(component.openDialogNewPayment).toEqual(false);
  });

  it(`openDialogDeletePayment has default value`, () => {
    expect(component.openDialogDeletePayment).toEqual(false);
  });
});
