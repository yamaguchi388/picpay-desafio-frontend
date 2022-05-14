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
import { PaymentsService } from 'src/app/core/services/payments/payments.service';

import { AddNewPaymentDialogComponent } from './add-new-payment-dialog.component';

describe('AddNewPaymentDialogComponent', () => {
  let component: AddNewPaymentDialogComponent;
  let fixture: ComponentFixture<AddNewPaymentDialogComponent>;
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
    mockPaymentsService = jasmine.createSpyObj(['newPayment']);
    mockPaymentsService.newPayment.and.returnValue(of(mockPayment));

    await TestBed.configureTestingModule({
      declarations: [AddNewPaymentDialogComponent],
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
    fixture = TestBed.createComponent(AddNewPaymentDialogComponent);
    component = fixture.componentInstance;
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
    component.onSubmit();
    expect(mockPaymentsService.newPayment).toHaveBeenCalled();
  });
});
