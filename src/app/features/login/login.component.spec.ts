import { AuthService } from 'src/app/core/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';

const fakeUser: User = { email: ' usuario@gmail.com', name: 'usuario', password: 'usuario', id: 0 };

describe('LoginComponent', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  const router = { navigate: jasmine.createSpy('navigate') };

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['authenticate']);
    mockAuthService.authenticate.and.returnValue(of(fakeUser));

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: router },
      ],
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

  it('should submit a form if the form is valid', () => {
    component.loginForm.setValue({ email: fakeUser.email, password: fakeUser.password });

    const btnSubmit = fixture.nativeElement.querySelector('#login-submit-btn');

    expect(!btnSubmit.disabled).toBeTruthy();
  });

  it('should submit a form and can log in', () => {
    component.loginForm.setValue({ email: fakeUser.email, password: fakeUser.password });

    component.onSubmitLoginForm();

    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
  });
});
