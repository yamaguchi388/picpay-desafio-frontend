import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DialogService } from './../shared/services/dialog/dialog.service';
import { userModel } from './../shared/models/user.model';
import { LoginService } from '../shared/services/login/login.service';
import { AuthService } from '../shared/services/auth/auth.service';
import { LoginComponent } from './login.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const dialogServiceStub = () => ({ getErrors: error => ({}) });
    const loginServiceStub = () => ({
      getUser: (value, value1) => ({ pipe: () => ({ subscribe: f => f({}) }) })
    });
    const authServiceStub = () => ({ setUser: response => ({}) });
    const formGroupStub = () => ({ get: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: DialogService, useFactory: dialogServiceStub },
        { provide: LoginService, useFactory: loginServiceStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: FormGroup, useFactory: formGroupStub },
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component .form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`hide has default value`, () => {
    expect(component.hide).toEqual(true);
  });

  it(`loginError has default value`, () => {
    expect(component.loginError).toEqual(false);
  });

  describe('onSucess', () => {
    it('makes expected calls', () => {
      const userModelStub: userModel = {
        "id": 0,
        "name": "usuario",
        "email": "usuario@gmail.com",
        "password": "usuario"
      };
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(authServiceStub, 'setUser').and.callThrough();
      component.onSucess(userModelStub);
      expect(authServiceStub.setUser).toHaveBeenCalled();
    });
  });

  describe('onSucess with length equals 0', () => {
    it('makes expected calls', () => {
      const userModelStub: userModel = <any>{};
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      component.onSucess(userModelStub);
      expect(component.loginError).toEqual(true);
    });
  });

  describe('login', () => {
    it('makes expected calls', () => {

      component.form.controls.email.setValue('email@email.com');
      component.form.controls.password.setValue('usuario');

      const dialogServiceStub: DialogService = fixture.debugElement.injector.get(
        DialogService
      );
      const loginServiceStub: LoginService = fixture.debugElement.injector.get(
        LoginService
      );
      spyOn(component, 'onSucess').and.callThrough();
      spyOn(loginServiceStub, 'getUser').and.callThrough();
      component.login();
      expect(component.onSucess).toHaveBeenCalled();
      expect(loginServiceStub.getUser).toHaveBeenCalled();
    });
  });
});
