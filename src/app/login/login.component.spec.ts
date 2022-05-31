import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { userMock } from '../core/mocks/user.mock';
import { AuthService } from '../core/services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authService: jasmine.SpyObj<AuthService> =
    jasmine.createSpyObj<AuthService>('AuthService', {
      login: of(userMock),
    });
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provider: AuthService, useValue: authService },
        FormBuilder,
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getEmailErrorMessage()', () => {
    it('should return required message', () => {
      component.form.get('email').setValue(null);
      fixture.detectChanges();

      const message = component.getEmailErrorMessage();

      expect(message).toEqual('Por favor insira um email!');
    });

    it('should return invalid email message', () => {
      component.form.get('email').setValue('invalid_email');
      fixture.detectChanges();

      const message = component.getEmailErrorMessage();

      expect(message).toEqual('Por favor insira um email válido!');
    });
  });

  describe('getPasswordErrorMessage()', () => {
    it('should return required message', () => {
      component.form.get('password').setValue(null);
      fixture.detectChanges();

      const message = component.getPasswordErrorMessage();

      expect(message).toEqual('Por favor insira uma senha!');
    });
  });

  describe('login()', () => {
    it('should disabled submit button if the form is invalid', () => {
      component.form.setValue({ email: null, password: null });
      fixture.detectChanges();

      const buttonElement: HTMLButtonElement =
        fixture.nativeElement.querySelector('.form__submit-button');

      expect(buttonElement).toBeTruthy();
      expect(buttonElement.disabled).toBeTrue();
    });

    it('should call login() when button is clicked', () => {
      spyOn(component, 'login');

      component.form.setValue({ email: 'teste@email.com', password: '123456' });
      fixture.detectChanges();

      const buttonElement: HTMLButtonElement =
        fixture.nativeElement.querySelector('.form__submit-button');
      buttonElement.click();

      expect(component.login).toHaveBeenCalled();
    });

    it('should navigate to pay-friends when autheticated', () => {
      spyOn(router, 'navigateByUrl');
      spyOn(component['authService'], 'login').and.returnValue(of(userMock));

      const credentials = { email: 'teste@email.com', password: '123456' };
      component.form.setValue(credentials);
      component.login();
      fixture.detectChanges();

      expect(component['authService'].login).toHaveBeenCalledWith(credentials);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/pay-friends');
    });
  });
});
