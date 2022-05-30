import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { userMock } from '../../mocks/user.mock';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should return true when is authenticated', () => {
    spyOn(guard['authService'], 'getUser').and.returnValue(of(userMock));
    guard.canActivate().subscribe((isAuthenticated: boolean) => {
      expect(isAuthenticated).toBeTrue();
    });
  });

  it('should return false when is not authenticated', () => {
    spyOn(guard['authService'], 'getUser').and.returnValue(of(null));
    guard.canActivate().subscribe((isAuthenticated: boolean) => {
      expect(isAuthenticated).toBeFalse();
    });
  });

  it('should navigate to login when is not authenticated', () => {
    const navigateByUrlSpy = spyOn(guard['router'], 'navigateByUrl');
    spyOn(guard['authService'], 'getUser').and.returnValue(of(null));
    guard.canActivate().subscribe(() => {
      expect(navigateByUrlSpy).toHaveBeenCalledWith('/login');
    });
  });
});
