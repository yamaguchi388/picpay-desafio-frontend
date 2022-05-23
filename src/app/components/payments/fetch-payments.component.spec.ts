import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderModule } from 'src/app/shared/header/header.module';

import { FetchPaymentsComponent } from './fetch-payments.component';
import { of } from 'rxjs';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { AddInsertPaymentsComponent } from './add-insert-payments/add-insert-payments.component';
import { DeletePaymentsComponent } from './delete-payments/delete-payments.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FetchPaymentsComponent', () => {
  let component: FetchPaymentsComponent;
  let fixture: ComponentFixture<FetchPaymentsComponent>;
  const paymentServiceStub = {
    getPayments: () => of({}),
    editPayment: () => of({}),
    deletePayment: () => of({}),
  };
  const matDialogStub = {
    open: () => {
      return {
        afterClosed: () => of({}),
      };
    },
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
      declarations: [FetchPaymentsComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatDialogModule,
        HeaderModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      providers: [
        { provide: PaymentService, useValue: paymentServiceStub },
        { provide: MatDialog, useValue: matDialogStub },
        { provide: MatSnackBar, useValue: matSnackBarStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(FetchPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get payments', () => {
    component.getPayments();
    expect(component.dataSource.data).toBeTruthy();
  });

  it('it should add payment', () => {
    const actionDummy = 'add';
    spyOn(component, 'setDialogTitle').and.callFake(() => { });
    component.addPaymentDialog(actionDummy);
    expect(component.setDialogTitle(actionDummy)).toHaveBeenCalled();
    expect(component.configureDialogAndSnackbar(AddInsertPaymentsComponent, null, actionDummy)).toHaveBeenCalled();
  });

  it('it should edit payment', () => {
    const actionDummy = 'edit';
    const idDummy = 1;
    spyOn(component, 'setDialogTitle').and.callFake(() => { });
    component.editPayment(actionDummy, idDummy);
    expect(component.setDialogTitle(actionDummy)).toHaveBeenCalled();
    expect(component.configureDialogAndSnackbar(AddInsertPaymentsComponent, idDummy)).toHaveBeenCalled();
  });

  it('it should delete payment', () => {
    const idDummy = 1;
    component.deletePayment(idDummy);
    expect(component.configureDialogAndSnackbar(DeletePaymentsComponent, idDummy)).toHaveBeenCalled();
  });

  it('it should set dialog title to Adicionar Pagamento', () => {
    const actionDummy = 'add';
    component.setDialogTitle(actionDummy);
    expect(component.pageTitle).toBe('Adicionar Pagamento');
  });

  it('it should set dialog title', () => {
    const actionDummy = 'edit';
    component.setDialogTitle(actionDummy);
    expect(component.pageTitle).toBe('Editar Pagamento');
  });

  it('it should apply filter', () => {
    const dataDummy = 'TesTe';
    component.applyFilter(dataDummy);
    expect(component.dataSource.filter).toBe('teste');
  });

  it('it should update payment status', () => {
    const paymentStatus = false;
    component.updatePaymentStatus(paymentsDataStub[0].id);
    expect(paymentStatus).toBe(true);
  });

});
