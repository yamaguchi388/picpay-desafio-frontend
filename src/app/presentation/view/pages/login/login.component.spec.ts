import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { IUsersController } from 'src/app/domain/interfaces/controllers/iusers-controller';

import { LoginComponent } from './login.component';
import { LoginModule } from './login.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const controllerSpy = jasmine.createSpyObj('IUsersController', [
      'login',
      'logout',
    ]);

    await TestBed.configureTestingModule({
      imports: [LoginModule, RouterTestingModule, TranslateModule.forRoot()],
      providers: [{ provide: IUsersController, useValue: controllerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login form', () => {
    expect(component.loginForm).toBeTruthy();
  });

  it('should have a login form with email and password', () => {
    expect(component.loginForm.controls['email']).toBeTruthy();
    expect(component.loginForm.controls['password']).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.valid).toBeFalsy();

    email.setValue('email@email.com');
    expect(email.valid).toBeTruthy();
  });

  it('password field validity', () => {
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.valid).toBeFalsy();

    password.setValue('123456');
    expect(password.valid).toBeTruthy();
  });

  it('password should init hidden', () => {
    expect(component.hidePassword).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    component.togglePasswordVisibility();
    expect(component.hidePassword).toBeFalsy();
    component.togglePasswordVisibility();
    expect(component.hidePassword).toBeTruthy();
  });

  it('should have submit button', () => {
    const submitButton =
      fixture.debugElement.nativeElement.querySelector('button');
    expect(submitButton).toBeTruthy();
  });
});
