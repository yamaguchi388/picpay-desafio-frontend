import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ConfirmationService } from 'src/app/core/services/confirmation/confirmation.service';
import { PaymentsService } from 'src/app/core/services/payments/payments.service';

import { AddNewPaymentDialogComponent } from '../../components/add-new-payment-dialog/add-new-payment-dialog.component';
import { AddNewPaymentDialogModule } from '../../components/add-new-payment-dialog/add-new-payment-dialog.module';
import { ConfirmationDialogModule } from '../../components/confirmation-dialog/confirmation-dialog.module';
import { EditPaymentDialogComponent } from '../../components/edit-payment-dialog/edit-payment-dialog.component';
import { EditPaymentDialogModule } from '../../components/edit-payment-dialog/edit-payment-dialog.module';
import { HeaderModule } from '../../components/header/header.module';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockPaymentsService: jasmine.SpyObj<PaymentsService>;
  let mockConfirmationService: jasmine.SpyObj<ConfirmationService>;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({ success: true }),
    close: null,
    componentInstance: { payment: {} },
  });
  let mockPayment = {
    id: 1,
    name: 'mock',
    username: 'mock',
    title: 'mock',
    value: 50,
    date: '2022-05-14',
    image: 'mock',
    isPayed: true,
  };

  beforeEach(async () => {
    mockPaymentsService = jasmine.createSpyObj(['deletePayment', 'getPayments', 'filterPaymentsByUsername']);
    mockPaymentsService.deletePayment.and.returnValue(of(mockPayment));
    mockPaymentsService.getPayments.and.returnValue(of([mockPayment]));
    mockPaymentsService.filterPaymentsByUsername.and.returnValue(of([mockPayment]));

    mockConfirmationService = jasmine.createSpyObj(['openConfirmationDialog']);
    mockConfirmationService.openConfirmationDialog.and.returnValue(of({ answer: true }));

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, DatePipe],
      imports: [
        HeaderModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatButtonModule,
        MatDialogModule,
        AddNewPaymentDialogModule,
        MatNativeDateModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSortModule,
        MatIconModule,
        ConfirmationDialogModule,
        EditPaymentDialogModule,
        MatInputModule,

        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: PaymentsService,
          useValue: mockPaymentsService,
        },
        {
          provide: ConfirmationService,
          useValue: mockConfirmationService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    component.dataSource.data = [mockPayment];
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getData', () => {
    component.getData();
    expect(mockPaymentsService.getPayments).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual([mockPayment]);
  });

  it('should setDataSource', () => {
    const mockDataSource = [mockPayment];
    component.setDataSource(mockDataSource);
    expect(component.dataSource.data).toEqual(mockDataSource);
  });

  it('should deletePayment', () => {
    component.deletePayment(1);
    expect(mockPaymentsService.deletePayment).toHaveBeenCalledWith(1);
  });

  it('should confirmDeletePayment', () => {
    component.confirmDeletePayment(1);
    expect(mockConfirmationService.openConfirmationDialog).toHaveBeenCalled();
  });

  it('should openEditPaymentModal', () => {
    component.openEditPaymentModal(mockPayment);
    expect(dialogSpy).toHaveBeenCalledWith(EditPaymentDialogComponent);
    expect(dialogRefSpyObj.componentInstance.payment).toEqual(mockPayment);
  });

  it('should open addNewPayment modal', () => {
    component.addNewPayment();
    expect(dialogSpy).toHaveBeenCalledWith(AddNewPaymentDialogComponent);
  });

  it('should searchForUser without value', () => {
    component.payments = [mockPayment];
    component.searchForUser('');
    expect(component.filteredPayments).toEqual(component.payments);
  });

  it('should searchForUser with value', () => {
    component.payments = [mockPayment];
    component.searchForUser('mock');
    expect(component.filteredPayments).toEqual(component.payments);
  });
});
