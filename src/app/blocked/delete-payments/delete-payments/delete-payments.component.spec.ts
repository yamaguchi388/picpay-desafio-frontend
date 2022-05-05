import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InjectionToken, NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentModel } from './../../../shared/models/payment.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentsService } from 'src/app/shared/services/payments/payments.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { DeletePaymentsComponent } from './delete-payments.component';

describe('DeletePaymentsComponent', () => {
  let component: DeletePaymentsComponent;
  let fixture: ComponentFixture<DeletePaymentsComponent>;

  beforeEach(() => {
    const paymentModelStub = () => ({ id: {} });
    const matDialogRefStub = () => ({ close: data => ({}) });
    const paymentsServiceStub = () => ({
      deletePayments: id => ({ pipe: () => ({ subscribe: f => f({}) }) })
    });
    const dialogServiceStub = () => ({ getErrors: error => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DeletePaymentsComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: PaymentModel, useFactory: paymentModelStub },
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: PaymentsService, useFactory: paymentsServiceStub },
        { provide: DialogService, useFactory: dialogServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DeletePaymentsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('deletePayment', () => {
    it('makes expected calls', () => {
      const paymentsServiceStub: PaymentsService = fixture.debugElement.injector.get(
        PaymentsService
      );
      const dialogServiceStub: DialogService = fixture.debugElement.injector.get(
        DialogService
      );
      spyOn(component, 'closeDialog').and.callThrough();
      spyOn(paymentsServiceStub, 'deletePayments').and.callThrough();
      component.deletePayment();
      expect(component.closeDialog).toHaveBeenCalled();
      expect(paymentsServiceStub.deletePayments).toHaveBeenCalled();
    });
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
});
