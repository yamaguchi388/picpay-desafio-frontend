import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { PaymentService } from 'src/app/services/payment.service';

import { MyPaymentsComponent } from './my-payments.component';

describe('MyPaymentsComponent', () => {
  let component: MyPaymentsComponent;
  let fixture: ComponentFixture<MyPaymentsComponent>;
  const paymentServiceStub = {
    searchAllPayments: () => of({}),
    searchPaymentsPerPage: () => of({}),
    updatePayment: () => of({}),
  };
  const matDialogStub = {};
  const matSnackBarStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPaymentsComponent ],
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
