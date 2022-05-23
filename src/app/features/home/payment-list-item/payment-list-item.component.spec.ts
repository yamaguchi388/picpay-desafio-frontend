import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Payment } from 'src/app/shared/models/payment';
import { SharedModule } from 'src/app/shared/shared.module';

import { PaymentListItemComponent } from './payment-list-item.component';

describe('PaymentListItemComponent', () => {
  let component: PaymentListItemComponent;
  let fixture: ComponentFixture<PaymentListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ PaymentListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentListItemComponent);
    component = fixture.componentInstance;

    component.onShowPaymentModal = (payment: Payment) => null;
    component.onShowConfirmDeletePaymentModal = (payment: Payment) => null;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showPaymentModal function and call onShowPaymentModal function', () => {
    const spyOnShowPaymentModal = spyOn(component, 'onShowPaymentModal');

    component.showPaymentModal();

    expect(spyOnShowPaymentModal).toHaveBeenCalled();
  });

  it('should call showConfirmDeleteModal function and call onShowConfirmDeletePaymentModal function', () => {
    const spyOnShowConfirmDeletePaymentModal = spyOn(component, 'onShowConfirmDeletePaymentModal');

    component.showConfirmDeleteModal();

    expect(spyOnShowConfirmDeletePaymentModal).toHaveBeenCalled();
  });
});
