import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ActionEnum } from 'src/app/enums/action.enum';
import { PaymentModel } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';

import { FormPaymentComponent } from './form-payment.component';

describe('FormPaymentComponent', () => {
  let component: FormPaymentComponent;
  let fixture: ComponentFixture<FormPaymentComponent>;
  const paymentServiceStub = {
    insertPayment: () => of({}),
    updatePayment: () => of({}),
    deletePayment: () => of({}),
  };
  const matSnackBarStub = {
    open: () => {},
  };
  const matDialogRef = {
    close: () => {},
  };
  const data = {
    action: ActionEnum.INSERT,
    payment: new PaymentModel()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPaymentComponent ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef }, 
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: PaymentService, useValue: paymentServiceStub },
        { provide: MatSnackBar, useValue: matSnackBarStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should call ngOnInit method', () => {
    it('with action is INSERT', () => {
      component.data.action = ActionEnum.INSERT;
      spyOn(component, 'initDataPayment').and.callThrough();
      component.ngOnInit();
      expect(component.data.action).toBe(ActionEnum.INSERT);
      expect(component.initDataPayment).toHaveBeenCalled();
    });
    it('with action is UPDATE', () => {
      component.paymentForm = new FormGroup({
        name: new FormControl(''),
        user: new FormControl(''),
        value: new FormControl(''), 
        date: new FormControl(''), 
        title: new FormControl(''),
        image: new FormControl(''),
        paid: new FormControl(''),
      });
      component.data.action = ActionEnum.UPDATE;
      spyOn(component, 'loadDataPayment').and.callThrough();
      component.ngOnInit();
      expect(component.data.action).toBe(ActionEnum.UPDATE);
      expect(component.loadDataPayment).toHaveBeenCalled();
    });
    it('with action is DELETE', () => {
      component.paymentForm = new FormGroup({
        name: new FormControl(''),
        user: new FormControl(''),
        value: new FormControl(''), 
        date: new FormControl(''), 
        title: new FormControl(''),
        image: new FormControl(''),
        paid: new FormControl(''),
      });
      component.msgDelete = 'Tem certeza que deseja deletar esse pagamento?';
      component.data.action = ActionEnum.DELETE;
      spyOn(component, 'loadDataPayment').and.callThrough();
      component.ngOnInit();
      expect(component.data.action).toBe(ActionEnum.DELETE);
      expect(component.loadDataPayment).toHaveBeenCalled();
      expect(component.msgDelete).toBe('Tem certeza que deseja deletar esse pagamento?');
    });
    it('with action is default (invalid)', () => {
      component.data.action = undefined;
      component.ngOnInit();
      expect(component.data.action).toBeUndefined();
    });
  });

  
  describe('should call savePayment method', () => {
    it('with action is INSERT', () => {
      component.paymentForm = new FormGroup({
        name: new FormControl('Nome Teste'),
        user: new FormControl('teste'),
        value: new FormControl('100'), 
        date: new FormControl('2020-02-09T18:20:32Z'), 
        title: new FormControl('Teste Titulo'),
        image: new FormControl(''),
        paid: new FormControl(false),
      });
      spyOn(component, 'insertPayment').and.callThrough();
      component.data.payment = new PaymentModel();
      spyOn(component, 'setPaymentValue').and.callThrough();
      spyOn(component, 'closedDialog').and.callThrough();
      component.data.action = ActionEnum.INSERT;
      component.savePayment();
      expect(component.data.action).toBe(ActionEnum.INSERT);
      expect(component.insertPayment).toHaveBeenCalled();
      expect(component.setPaymentValue).toHaveBeenCalled();
      expect(component.closedDialog).toHaveBeenCalled();
    });
    it('with action is UPDATE', () => {
      component.paymentForm = new FormGroup({
        name: new FormControl('Nome Teste'),
        user: new FormControl('teste'),
        value: new FormControl('100'), 
        date: new FormControl('2020-02-09T18:20:32Z'), 
        title: new FormControl('Teste Titulo'),
        image: new FormControl(''),
        paid: new FormControl(false),
      });
      spyOn(component, 'updatePayment').and.callThrough();
      component.data.payment = new PaymentModel();
      spyOn(component, 'setPaymentValue').and.callThrough();
      spyOn(component, 'closedDialog').and.callThrough();
      component.data.action = ActionEnum.UPDATE;
      component.savePayment();
      expect(component.data.action).toBe(ActionEnum.UPDATE);
      expect(component.updatePayment).toHaveBeenCalled();
      expect(component.setPaymentValue).toHaveBeenCalled();
      expect(component.closedDialog).toHaveBeenCalled();
    });
    it('with action is DELETE', () => {
      spyOn(component, 'deletePayment').and.callThrough();
      component.data.payment = new PaymentModel();
      spyOn(component, 'closedDialog').and.callThrough();
      component.data.action = ActionEnum.DELETE;
      component.savePayment();
      expect(component.data.action).toBe(ActionEnum.DELETE);
      expect(component.deletePayment).toHaveBeenCalled();
      expect(component.closedDialog).toHaveBeenCalled();
    });
    it('with action is default (invalid)', () => {
      component.paymentForm = new FormGroup({
        name: new FormControl('Nome Teste'),
        user: new FormControl('teste'),
        value: new FormControl('100'), 
        date: new FormControl('2020-02-09T18:20:32Z'), 
        title: new FormControl('Teste Titulo'),
        image: new FormControl(''),
        paid: new FormControl(false),
      });
      component.data.action = null;
      spyOn(matSnackBarStub, 'open').and.callThrough();
      component.savePayment();
      expect(matSnackBarStub.open).toHaveBeenCalled();
    });
    it('with paymentForm is invalid and action is not DELETE', () => {
      component.data.action = ActionEnum.INSERT;
      component.paymentForm = new FormGroup({
        name: new FormControl('Nome Teste Nome Teste Nome Teste Nome Teste Nome Teste Nome Teste Nome Teste'),
        user: new FormControl(undefined),
        value: new FormControl('100'), 
        date: new FormControl('2020-02-09T18:20:32Z'), 
        title: new FormControl('Teste Titulo'),
        image: new FormControl(''),
        paid: new FormControl(false),
      });
      spyOn(matSnackBarStub, 'open').and.callThrough();
      component.savePayment();
      expect(matSnackBarStub.open).toHaveBeenCalled();
    });
  });

  
});
