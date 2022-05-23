import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddPaymentModalComponent } from './add-payment-modal/add-payment-modal.component';
import { ConfirmDeletePaymentComponent } from './confirm-delete-payment/confirm-delete-payment.component';

import { HomeComponent } from './home.component';

const mockPayment = {
  id: 300,
  name: 'Alex Alexandrino',
  username: 'alex_o',
  title: 'Almoço',
  value: 12.10,
  date: '2020-05-23T00:00:00Z',
  image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
  isPayed: false,
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        HomeComponent,
        AddPaymentModalComponent,
        ConfirmDeletePaymentComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleSearch should set a value in searchValue', () => {
    const spyOnRefreshData = spyOn(component, 'onRefreshData');

    component.handleSearch('search');
    fixture.detectChanges();

    expect(component.searchValue).toEqual('search');
    expect(spyOnRefreshData).toHaveBeenCalled();
  });

  it('onChangeLimitSelect should set a value in paymentsListLimit', () => {
    const spyOnRefreshData = spyOn(component, 'onRefreshData');

    component.onChangeLimitSelect(10);
    fixture.detectChanges();

    expect(component.paymentsListLimit).toEqual(10);
    expect(spyOnRefreshData).toHaveBeenCalled();
  });

  it('onShowPaymentModal should show the add payment modal', () => {
    component.onShowPaymentModal();

    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector("#custom-modal");

    expect(modal).toBeTruthy();
    expect(component.onShowPaymentModal).toBeTruthy();
  });

  it('onShowConfirmDeletePaymentModal should show the confirm delete payment modal', () => {
    component.onShowConfirmDeletePaymentModal(mockPayment);

    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector("#custom-modal");

    expect(modal).toBeTruthy();
    expect(component.showConfirmDeletePaymentModal).toBeTruthy();
  });
});
