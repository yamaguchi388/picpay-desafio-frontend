import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentModalComponent } from './add-payment-modal.component';
import { Payment } from 'src/app/shared/models/payment';
import { ReactiveFormsModule } from '@angular/forms';

const mockPayment = {
  name: 'Alex Alexandrino',
  username: 'alex_o',
  title: 'Almoço',
  value: 12.10,
  date: '2020-05-23T00:00:00.000Z',
};

describe('AddPaymentModalComponent', () => {
  let component: AddPaymentModalComponent;
  let fixture: ComponentFixture<AddPaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentModalComponent);
    component = fixture.componentInstance;

    component.savePayments = (payment: Payment, isNewPayment: boolean) => null;
    component.closeModal = () => null;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new payment', () => {
    const spySavePayment = spyOn(component, 'savePayments');

    component.paymentForm.setValue(mockPayment);

    component.onSubmitLoginForm();

    expect(spySavePayment).toHaveBeenCalledOnceWith({...mockPayment, isPayed: false}, true);
  });
});
