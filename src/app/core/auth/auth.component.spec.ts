/* eslint-disable no-undef */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuthComponent } from './auth.component';
import { NgxsModule } from '@ngxs/store';
import { PaymentsComponent } from '../../payments/payments.component';
import { ROUTES } from '../../shared/consts/routes';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { findComponent } from '../../shared/utils/find-component.util';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent, PaymentsComponent],
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        NgxsModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: ROUTES.PAYMENTS, component: PaymentsComponent }
        ]),
        TranslateModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login button should be disabled when component launch', () => {
    const loginButton = findComponent(fixture, 'button');
    expect(loginButton.nativeElement.disabled).toBeTruthy();
  });

  it('login button should be enabled when authForm is valid', () => {
    component.authForm.get('email').setValue('usuario@usuario.com');
    component.authForm.get('password').setValue('123');
    fixture.detectChanges();
    const loginButton = findComponent(fixture, 'button');
    expect(loginButton.nativeElement.disabled).toBeFalsy();
  });

  it('should get form values', () => {
    component.authForm.get('email').setValue('usuario@usuario.com');
    component.authForm.get('password').setValue('123');
    fixture.detectChanges();
    expect(component.authForm.value).toEqual({
      email: 'usuario@usuario.com',
      password: '123'
    });
  });

  it('should show error message when login fails', fakeAsync(() => {
    component.authForm.get('email').setValue('usuario@usuario.com');
    component.authForm.get('password').setValue('123');
    const loginButton = findComponent(fixture, 'button');
    const showErrorMessageSpy = spyOn(component, 'showErrorMessage');
    const dispatchAuthSpy = spyOn(component, 'dispatchAuth').and.returnValue(
      throwError('Login falhou')
    );
    fixture.detectChanges();
    loginButton.nativeElement.click();
    expect(dispatchAuthSpy).toHaveBeenCalled();
    expect(showErrorMessageSpy).toHaveBeenCalledWith('Login falhou');
  }));

  it('should redirect to payments route when login successs', fakeAsync(() => {
    component.authForm.get('email').setValue('usuario@usuario.com');
    component.authForm.get('password').setValue('123');
    const loginButton = findComponent(fixture, 'button');
    const navigateToPaymentsRoutesSpy = spyOn(
      component,
      'navigateToPaymentsRoutes'
    );
    const dispatchAuthSpy = spyOn(component, 'dispatchAuth').and.returnValue(
      of('Sucesso')
    );
    fixture.detectChanges();
    loginButton.nativeElement.click();
    tick(50);
    expect(dispatchAuthSpy).toHaveBeenCalled();
    expect(navigateToPaymentsRoutesSpy).toHaveBeenCalledWith();
  }));
});
