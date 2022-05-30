import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const authService: jasmine.SpyObj<AuthService> =
    jasmine.createSpyObj<AuthService>('AuthService', {
      logout: undefined,
    });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [{ provider: AuthService, useValue: authService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do logout', () => {
    spyOn(component['authService'], 'logout');
    component.logout();
    expect(component['authService'].logout).toHaveBeenCalled();
  });
});
