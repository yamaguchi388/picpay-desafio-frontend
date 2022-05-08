import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { Component, OnInit } from '@angular/core';
import { InputModule } from './input.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-mock-test-componenr',
  template: `
    <form [formGroup]="form">
      <app-input
        id="name"
        label="Name*"
        placeholder="Name"
        formControlName="name"
        type="text"
      ></app-input>

      <app-input
        id="password"
        label="Senha*"
        placeholder="Senha"
        formControlName="password"
        type="password"
      ></app-input>

      <app-input
        id="email"
        label="E-mail*"
        placeholder="E-mail"
        formControlName="email"
        type="email"
      ></app-input>
    </form>
  `,
})
export class MockTestComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}

describe('InputComponent', () => {
  let component: MockTestComponent;
  let fixture: ComponentFixture<MockTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        InputModule,
        NoopAnimationsModule,
      ],
      declarations: [MockTestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update form value when user insert value', () => {
    const nameAppInput = fixture.debugElement.query(By.css('#name'));
    const nameInput = nameAppInput.query(By.css('#name'));

    nameInput.nativeElement.value = 'Dummy name';
    nameInput.nativeElement.dispatchEvent(new Event('input'));

    const passwordAppInput = fixture.debugElement.query(By.css('#password'));
    const passwordInput = passwordAppInput.query(By.css('#password'));

    passwordInput.nativeElement.value = 'Dummy pass';
    passwordInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.form.get('name').value).toEqual('Dummy name');
    expect(component.form.get('password').value).toEqual('Dummy pass');
  });

  it('should show email errors when user try insert wrong email on field', () => {
    const emailAppInput = fixture.debugElement.query(By.css('#email'));
    const emailInput = emailAppInput.query(By.css('#email'));

    emailInput.nativeElement.value = 'invalid_email';
    emailInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.form.get('email').invalid).toBeTruthy();
    expect(component.form.get('email').errors).toEqual({ email: true });
  });

  it('should set disable on field when form control is disabled', () => {
    component.form.get('name').disable();

    fixture.detectChanges();

    const nameAppInput = fixture.debugElement.query(By.css('#name'));
    const nameInput = nameAppInput.query(By.css('#name'));

    expect(nameInput.nativeElement.disabled).toBeTruthy();
  });

  it('should set disable on field when form control is disabled', () => {
    component.form.get('name').disable();

    fixture.detectChanges();

    const nameAppInput = fixture.debugElement.query(By.css('#name'));
    const nameInput = nameAppInput.query(By.css('#name'));

    expect(nameInput.nativeElement.disabled).toBeTruthy();
  });

  it('should emit on change event when value on input has changed', () => {
    component.form.get('name').disable();

    fixture.detectChanges();

    const nameAppInput = fixture.debugElement.query(By.css('#name'));
    const nameInput = nameAppInput.query(By.css('#name'));

    expect(nameInput.nativeElement.disabled).toBeTruthy();
  });
});
