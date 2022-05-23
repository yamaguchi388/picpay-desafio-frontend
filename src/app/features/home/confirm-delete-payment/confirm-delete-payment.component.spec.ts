import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { ConfirmDeletePaymentComponent } from './confirm-delete-payment.component';

describe('ConfirmDeletePaymentComponent', () => {
  let component: ConfirmDeletePaymentComponent;
  let fixture: ComponentFixture<ConfirmDeletePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ ConfirmDeletePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeletePaymentComponent);
    component = fixture.componentInstance;

    component.onConfirmDeletPayment = () => null;
    component.closeModal = () => null;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onConfirm function and call onConfirmDeletePayment function', () => {
    const spyOnConfirmDeletPayment = spyOn(component, 'onConfirmDeletPayment');

    component.onConfirm();

    expect(spyOnConfirmDeletPayment).toHaveBeenCalled();
  });
});
