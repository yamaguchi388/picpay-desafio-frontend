import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared.module';

import { AddPaymentComponent } from './add-payment.component';

describe('AddPaymentComponent', () => {
  let component: AddPaymentComponent;
  let fixture: ComponentFixture<AddPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), SharedModule],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.paymentForm.controls['title'].valid).toBeTruthy();
    expect(component.paymentForm.valid).toBeFalsy();
  });

  it('title field validity', () => {
    const title = component.paymentForm.controls['title'];
    expect(title.valid).toBeTruthy();

    title.setValue('');
    expect(title.valid).toBeTruthy();

    title.setValue('Title');
    expect(title.valid).toBeTruthy();
  });

  it('value field validity', () => {
    const value = component.paymentForm.controls['value'];
    expect(value.valid).toBeFalsy();

    value.setValue('');
    expect(value.valid).toBeFalsy();

    value.setValue('123');
    expect(value.valid).toBeTruthy();
  });

  it('name field validity', () => {
    const name = component.paymentForm.controls['name'];
    expect(name.valid).toBeFalsy();

    name.setValue('');
    expect(name.valid).toBeFalsy();

    name.setValue('Nomezinho');
    expect(name.valid).toBeTruthy();
  });

  it('date field validity', () => {
    const date = component.paymentForm.controls['date'];
    expect(date.valid).toBeFalsy();

    date.setValue('');
    expect(date.valid).toBeFalsy();

    date.setValue(new Date());
    expect(date.valid).toBeTruthy();
  });
});
