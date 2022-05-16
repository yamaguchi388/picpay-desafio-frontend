import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const userServiceStub = {
    login: () => of({}),
  };
  const matSnackBarStub = {};

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should call login method', () => {
    it('with form login invalid', () => {
      component.login();
      expect(component.formLogin.invalid).toBeTruthy();
    });
    it('with form login valid', () => {
      const testUser = {
        email: 'usuario@gmail.com',
        password: 'usuario'
      };
      component.formLogin.controls['email'].setValue(testUser.email);
      component.formLogin.controls['password'].setValue(testUser.password);
      component.login();
      expect(component.formLogin.invalid).toBeFalsy();
    });
  });
});
