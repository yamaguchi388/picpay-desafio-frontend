import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldErrorMsgComponent } from './form-field-error-msg.component';

describe('FormFieldErrorMsgComponent', () => {
  let component: FormFieldErrorMsgComponent;
  let fixture: ComponentFixture<FormFieldErrorMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFieldErrorMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldErrorMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
