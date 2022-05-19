import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { AddInsertPaymentsComponent } from './add-insert-payments.component';

describe('AddInsertPaymentsComponent', () => {
  let component: AddInsertPaymentsComponent;
  let fixture: ComponentFixture<AddInsertPaymentsComponent>;
  let matSnackBar: jasmine.SpyObj<MatSnackBar>;

  const paymentServiceStub = {
    getPaymentById: () => of({ id: 1, name: '', username: '', title: '', value: 0, date: '', image: '', isPayed: false }),
  };
  const matSnackBarStub = {
    open: () => { },
  };
  const paymentsDataStub = [
    {
      id: 1,
      name: 'Pennie Dumphries',
      username: 'pdumphries0',
      title: 'Dental Hygienist',
      value: 19.96,
      date: '2020-07-21',
      image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
      isPayed: true
    },
    {
      id: 2,
      name: 'Foster Orthmann',
      username: 'forthmann1',
      title: 'Professor',
      value: 207.36,
      date: '2021-01-28',
      image: 'https://robohash.org/quasetqui.png?size=150x150&set=set1',
      isPayed: true
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInsertPaymentsComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) },
        { provide: PaymentService, useValue: paymentServiceStub },
        { provide: MatSnackBar, useValue: matSnackBarStub }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AddInsertPaymentsComponent);
    component = fixture.componentInstance;
    matSnackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create forms', () => {
    spyOn(component, 'createForm').and.callThrough();

    component.createForm();

    expect(component.createForm).toHaveBeenCalled();
  });

  it('should add payments', () => {
    spyOn(component, 'addPayment').and.callThrough();

    component.addPayment();

    expect(component.addPayment).toHaveBeenCalled();
    expect(component.snackBar).toHaveBeenCalled();
  });

  it('should updatePayment', () => {
    spyOn(component, 'updatePayment').and.callThrough();

    component.updatePayment(1);

    expect(component.updatePayment).toHaveBeenCalled();
  });

  it('should updateData', () => {
    spyOn(component, 'snackBar').and.callThrough();
    component.updateData(1);
    expect(component.data.id).toEqual(1);
    expect(component.snackBar).toHaveBeenCalled();
  });

  it('should check message to show in snackBar with Registro inserido com sucesso', () => {
    component.snackBar();
    component.data.pageTitle = 'Adicionar Pagamento';
    expect(component.message).toEqual('Registro inserido com sucesso');
  });

  it('should not show username in Editar Pagamento dialog', () => {
    component.data.pageTitle = 'Editar Pagamento';
    component.addRemoveValidators();
    expect(component.showUserName).toBeFalsy();
  });

  it('should check message to show in snackBar with Registro alterado com sucesso', () => {
    component.data.pageTitle = 'Editar Pagamento';
    component.snackBar();
    expect(component.message).toEqual('Registro alterado com sucesso');
  });

});
