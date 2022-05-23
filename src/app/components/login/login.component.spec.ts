import { FetchPaymentsComponent } from './../payments/fetch-payments.component';
import { User } from './../../models/account.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder, FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let snackbarSpy: jasmine.Spy;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  const formBuilder: FormBuilder = new FormBuilder();

  const mockUser: User = {
    id: 0,
    name: 'usuario',
    email: 'usuario@gmail.com',
    password: 'usuario',
  };
  const authServiceStub = {
    authenticate(email: string, password: string) {
      const userResponse = {
        email: 'teste',
        password: 'teste',
      };
      return userResponse;
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        RouterModule,
        MatIconModule,
        RouterTestingModule.withRoutes([{ path: 'payments', component: FetchPaymentsComponent }]),
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [ AuthService, FormBuilder,
        {
          provide: AuthService,
          useValue: authServiceStub,
        },
        {
          provide: FormBuilder,
          useValue: formBuilder,
        },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    snackbarSpy = spyOn(TestBed.inject(MatSnackBar), 'open');
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    component.login();
    authService = jasmine.createSpyObj(['setUser', 'authenticate']);
    component.loginForm.controls.email.setValue('usuario@gmail.com');
    component.loginForm.controls.password.setValue('usuario');
    expect(authService.setUser).toHaveBeenCalledWith(mockUser);
    expect(component.loginForm.valid).toBeTruthy();
  });

});
