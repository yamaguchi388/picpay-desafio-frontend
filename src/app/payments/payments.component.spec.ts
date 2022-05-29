/* eslint-disable no-undef */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { PaymentsComponent } from './payments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { findComponent } from '../shared/utils/find-component.util';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        NgxsModule.forRoot()
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search by name', fakeAsync(() => {
    component.ngOnInit();
    const getPaymentsSpy = spyOn(component, 'getPayments');
    component.searchForm.get('name').setValue('Nome');
    tick(500);
    fixture.detectChanges();
    expect(component.pageIndex).toBe(1);
    expect(component.paymentFilter.name).toBe('Nome');
    expect(getPaymentsSpy).toHaveBeenCalled();
  }));

  it('should sort table', () => {
    const paymentTable = findComponent(fixture, 'app-payments-table');
    const getPaymentsSpy = spyOn(component, 'getPayments');
    paymentTable.triggerEventHandler('sort', {
      active: '2',
      direction: 'asc'
    });
    fixture.detectChanges();
    expect(getPaymentsSpy).toHaveBeenCalled();
    expect(component.sort).toEqual({
      active: '2',
      direction: 'asc'
    });
  });
});
