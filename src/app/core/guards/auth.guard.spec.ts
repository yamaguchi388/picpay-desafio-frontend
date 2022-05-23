import { AuthService } from 'src/app/core/auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  const router = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['isAuthenticated']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: router },
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should have access', () => {
    mockAuthService.isAuthenticated.and.returnValue(true);

    const route: Partial<ActivatedRouteSnapshot> = {
      queryParams: {}
    };
    const state: Partial<RouterStateSnapshot> = {
      url: './dashboard'
    };

    expect(guard.canActivate(route as ActivatedRouteSnapshot, state as RouterStateSnapshot)).toBeTruthy();
  });

  it('should not have access and redirect to login page', () => {
    mockAuthService.isAuthenticated.and.returnValue(false);

    const route: Partial<ActivatedRouteSnapshot> = {
      queryParams: {}
    };
    const state: Partial<RouterStateSnapshot> = {
      url: './dashboard'
    };

    guard.canActivate(route as ActivatedRouteSnapshot, state as RouterStateSnapshot);

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
