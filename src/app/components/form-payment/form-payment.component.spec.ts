import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ActionEnum } from 'src/app/enums/action.enum';
import { PaymentModel } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { FormPaymentComponent } from './form-payment.component';


describe('FormPaymentComponent', () => {
  let componentFormPayment: FormPaymentComponent;
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
    componentFormPayment = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentFormPayment).toBeTruthy();
  });

  describe('should call ngOnInit method', () => {
    it('with action is INSERT', () => {
      componentFormPayment.data.action = ActionEnum.INSERT;
      spyOn(componentFormPayment, 'initDataPayment').and.callThrough();
      componentFormPayment.ngOnInit();
      expect(componentFormPayment.data.action).toBe(ActionEnum.INSERT);
      expect(componentFormPayment.initDataPayment).toHaveBeenCalled();
    });
    it('with action is UPDATE', () => {
      componentFormPayment.paymentForm = new FormGroup({
        name: new FormControl(''),
        user: new FormControl(''),
        value: new FormControl(''), 
        date: new FormControl(''), 
        title: new FormControl(''),
        image: new FormControl(''),
        paid: new FormControl(''),
      });
      componentFormPayment.data.action = ActionEnum.UPDATE;
      spyOn(componentFormPayment, 'loadDataPayment').and.callThrough();
      componentFormPayment.ngOnInit();
      expect(componentFormPayment.data.action).toBe(ActionEnum.UPDATE);
      expect(componentFormPayment.loadDataPayment).toHaveBeenCalled();
    });
    it('with action is DELETE', () => {
      componentFormPayment.paymentForm = new FormGroup({
        name: new FormControl('Andreia'),
        user: new FormControl('deia'),
        value: new FormControl('100'), 
        date: new FormControl('16/05/2022'), 
        title: new FormControl('Teste'),
        image: new FormControl(''),
        paid: new FormControl(''),
      });
      componentFormPayment.msgDelete = 'Tem certeza que deseja deletar esse pagamento?';
      componentFormPayment.data.action = ActionEnum.DELETE;
      spyOn(componentFormPayment, 'loadDataPayment').and.callThrough();
      componentFormPayment.ngOnInit();
      expect(componentFormPayment.data.action).toBe(ActionEnum.DELETE);
      expect(componentFormPayment.loadDataPayment).toHaveBeenCalled();
      expect(componentFormPayment.msgDelete).toBe('Tem certeza que deseja deletar esse pagamento?');
    });
    it('with action is default (invalid)', () => {
      componentFormPayment.data.action = undefined;
      componentFormPayment.ngOnInit();
      expect(componentFormPayment.data.action).toBeUndefined();
    });
  });

  
  describe('should call savePayment method', () => {
    it('with action is INSERT', () => {
      componentFormPayment.paymentForm = new FormGroup({
        name: new FormControl('Nome Teste'),
        user: new FormControl('teste'),
        value: new FormControl('100'), 
        date: new FormControl('2020-02-09T18:20:32Z'), 
        title: new FormControl('Teste Titulo'),
        image: new FormControl(''),
        paid: new FormControl(false),
      });
      spyOn(componentFormPayment, 'insertPayment').and.callThrough();
      componentFormPayment.data.payment = new PaymentModel();
      spyOn(componentFormPayment, 'setPaymentValue').and.callThrough();
      spyOn(componentFormPayment, 'closedDialog').and.callThrough();
      componentFormPayment.data.action = ActionEnum.INSERT;
      componentFormPayment.savePayment();
      expect(componentFormPayment.data.action).toBe(ActionEnum.INSERT);
      expect(componentFormPayment.insertPayment).toHaveBeenCalled();
      expect(componentFormPayment.setPaymentValue).toHaveBeenCalled();
      expect(componentFormPayment.closedDialog).toHaveBeenCalled();
    });
    it('with action is UPDATE', () => {
      componentFormPayment.paymentForm = new FormGroup({
        name: new FormControl('Nome Teste'),
        user: new FormControl('teste'),
        value: new FormControl('100'), 
        date: new FormControl('2020-02-09T18:20:32Z'), 
        title: new FormControl('Teste Titulo'),
        image: new FormControl(''),
        paid: new FormControl(false),
      });
      spyOn(componentFormPayment, 'updatePayment').and.callThrough();
      componentFormPayment.data.payment = new PaymentModel();
      spyOn(componentFormPayment, 'setPaymentValue').and.callThrough();
      spyOn(componentFormPayment, 'closedDialog').and.callThrough();
      componentFormPayment.data.action = ActionEnum.UPDATE;
      componentFormPayment.savePayment();
      expect(componentFormPayment.data.action).toBe(ActionEnum.UPDATE);
      expect(componentFormPayment.updatePayment).toHaveBeenCalled();
      expect(componentFormPayment.setPaymentValue).toHaveBeenCalled();
      expect(componentFormPayment.closedDialog).toHaveBeenCalled();
    });
    it('with action is DELETE', () => {
      spyOn(componentFormPayment, 'deletePayment').and.callThrough();
      componentFormPayment.data.payment = new PaymentModel();
      spyOn(componentFormPayment, 'closedDialog').and.callThrough();
      componentFormPayment.data.action = ActionEnum.DELETE;
      componentFormPayment.savePayment();
      expect(componentFormPayment.data.action).toBe(ActionEnum.DELETE);
      expect(componentFormPayment.deletePayment).toHaveBeenCalled();
      expect(componentFormPayment.closedDialog).toHaveBeenCalled();
    });
    it('with action is default (invalid)', () => {
      componentFormPayment.paymentForm = new FormGroup({
        name: new FormControl('Nome Teste'),
        user: new FormControl('teste'),
        value: new FormControl('100'), 
        date: new FormControl('2020-02-09T18:20:32Z'), 
        title: new FormControl('Teste Titulo'),
        image: new FormControl(''),
        paid: new FormControl(false),
      });
      componentFormPayment.data.action = null;
      spyOn(matSnackBarStub, 'open').and.callThrough();
      componentFormPayment.savePayment();
      expect(matSnackBarStub.open).toHaveBeenCalled();
    });
    it('with paymentForm is invalid and action is not DELETE', () => {
      componentFormPayment.data.action = ActionEnum.INSERT;
      componentFormPayment.paymentForm = new FormGroup({
        name: new FormControl('Nome Teste Nome Teste Nome Teste Nome Teste Nome Teste Nome Teste Nome Teste'),
        user: new FormControl(undefined),
        value: new FormControl('100'), 
        date: new FormControl('2020-02-09T18:20:32Z'), 
        title: new FormControl('Teste Titulo'),
        image: new FormControl(''),
        paid: new FormControl(false),
      });
      spyOn(matSnackBarStub, 'open').and.callThrough();
      componentFormPayment.savePayment();
      expect(matSnackBarStub.open).toHaveBeenCalled();
    });
  });

  
});
