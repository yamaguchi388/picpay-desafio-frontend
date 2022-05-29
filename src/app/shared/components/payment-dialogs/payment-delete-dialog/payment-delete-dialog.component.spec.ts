/* eslint-disable no-undef */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { PaymentDeleteDialogComponent } from './payment-delete-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

describe('PaymentDeleteDialogComponent', () => {
  let component: PaymentDeleteDialogComponent;
  let fixture: ComponentFixture<PaymentDeleteDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentDeleteDialogComponent],
      imports: [NgxsModule.forRoot(), TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
