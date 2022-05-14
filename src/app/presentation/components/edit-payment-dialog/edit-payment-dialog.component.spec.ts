import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { of } from 'rxjs';
import { PaymentsService } from 'src/app/services/payments/payments.service';

import { EditPaymentDialogComponent } from './edit-payment-dialog.component';

describe('EditPaymentDialogComponent', () => {
  let component: EditPaymentDialogComponent;
  let fixture: ComponentFixture<EditPaymentDialogComponent>;
  let mockPaymentsService: jasmine.SpyObj<PaymentsService>;
  let mockPayment = {
    id: 1,
    name: 'mock',
    username: 'mock',
    title: 'mock',
    value: 50,
    date: 'mock',
    image: 'mock',
    isPayed: true,
  };
  const dialogMock = {
    close: () => {},
  };

  beforeEach(async () => {
    mockPaymentsService = jasmine.createSpyObj(['editPayment']);
    mockPaymentsService.editPayment.and.returnValue(of(mockPayment));

    await TestBed.configureTestingModule({
      declarations: [EditPaymentDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        BrowserAnimationsModule,
        NgxMaskModule.forRoot(),
        MatCheckboxModule,
        MatNativeDateModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
        {
          provide: PaymentsService,
          useValue: mockPaymentsService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentDialogComponent);
    component = fixture.componentInstance;
    component.payment = mockPayment;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close', () => {
    let spy = spyOn(component.matDialogRef, 'close').and.callThrough();
    component.close();
    expect(spy).toHaveBeenCalled();
  });

  it('should edit payment', () => {
    component.editPayment();
    expect(mockPaymentsService.editPayment).toHaveBeenCalled();
  });
});
