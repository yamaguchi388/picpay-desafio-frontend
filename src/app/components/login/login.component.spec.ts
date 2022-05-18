import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let componentLogin: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const userServiceStub = {
    login: () => of({}),
  };
  const matSnackBarStub = {
    open: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceStub },
        { provide: MatSnackBar, useValue: matSnackBarStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    componentLogin = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentLogin).toBeTruthy();
  });

  describe('should call login method', () => {
    it('with form login invalid', () => {
      componentLogin.login();
      expect(componentLogin.formLogin.invalid).toBeTruthy();
    });
    it('with form login valid', () => {
      const testUser = {
        email: 'usuario@gmail.com',
        password: 'usuario'
      };
      componentLogin.formLogin.controls['email'].setValue(testUser.email);
      componentLogin.formLogin.controls['password'].setValue(testUser.password);
      componentLogin.login();
      expect(componentLogin.formLogin.invalid).toBeFalsy();
    });
  });
});
