import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let snackbarSpy: jasmine.Spy;

  const mockUser = {
    id: 0,
    name: 'usuario',
    email: 'usuario@gmail.com',
    password: 'usuario',
  };

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['setUser', 'login']);
    mockAuthService.login.and.returnValue(of([mockUser]));

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([{ path: 'dashboard', component: DashboardComponent }]),
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    snackbarSpy = spyOn(TestBed.get(MatSnackBar), 'open');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    const mockLoginForm = { email: 'usuario@gmail.com', password: 'usuario' };

    component.loginForm.setValue(mockLoginForm);
    component.login();
    expect(mockAuthService.setUser).toHaveBeenCalledWith(mockUser);
  });
});
