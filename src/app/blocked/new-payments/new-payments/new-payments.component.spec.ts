import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentsService } from './../../../shared/services/payments/payments.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { PaymentModel } from 'src/app/shared/models/payment.model';
import { DateService } from 'src/app/shared/services/date/date.service';
import { NewPaymentsComponent } from './new-payments.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

describe('NewPaymentsComponent', () => {
  let component: NewPaymentsComponent;
  let fixture: ComponentFixture<NewPaymentsComponent>;

  beforeEach(() => {
    const paymentsServiceStub = () => ({
      createPayments: value => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      editPayments: value => ({ pipe: () => ({ subscribe: f => f({}) }) })
    });
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const matDialogRefStub = () => ({ close: value => ({}) });
    const dialogServiceStub = () => ({ getErrors: error => ({}) });
    const paymentModelStub = () => ({
      date: {},
      id: {},
      name: {},
      username: {},
      title: {},
      value: {},
      image: {},
      isPayed: {}
    });
    const dateServiceStub = () => ({ formatTime: date => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NewPaymentsComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: PaymentsService, useFactory: paymentsServiceStub },
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: DialogService, useFactory: dialogServiceStub },
        { provide: PaymentModel, useFactory: paymentModelStub },
        { provide: DateService, useFactory: dateServiceStub }
      ]
    });
    fixture = TestBed.createComponent(NewPaymentsComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      title: new FormControl(''),
      value: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      isPayed: new FormControl(''),
    });
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('closeDialog', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef<any, any> = fixture.debugElement.injector.get(
        MatDialogRef
      );
      spyOn(matDialogRefStub, 'close').and.callThrough();
      component.closeDialog();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });

  describe('createPayment', () => {
    it('makes expected calls', () => {
      const paymentsServiceStub: PaymentsService = fixture.debugElement.injector.get(
        PaymentsService
      );
      const dialogServiceStub: DialogService = fixture.debugElement.injector.get(
        DialogService
      );
      spyOn(component, 'closeDialog').and.callThrough();
      spyOn(paymentsServiceStub, 'createPayments').and.callThrough();
      component.createPayment();
      expect(component.closeDialog).toHaveBeenCalled();
      expect(paymentsServiceStub.createPayments).toHaveBeenCalled();
    });
  });

  describe('editPayment', () => {
    it('makes expected calls', () => {
      const paymentsServiceStub: PaymentsService = fixture.debugElement.injector.get(
        PaymentsService
      );
      const dialogServiceStub: DialogService = fixture.debugElement.injector.get(
        DialogService
      );
      spyOn(component, 'closeDialog').and.callThrough();
      spyOn(paymentsServiceStub, 'editPayments').and.callThrough();
      component.editPayment();
      expect(component.closeDialog).toHaveBeenCalled();
      expect(paymentsServiceStub.editPayments).toHaveBeenCalled();
    });
  });
});
