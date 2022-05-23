import { AuthService } from 'src/app/core/auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NotAuthGuard } from './not-auth.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

describe('NotAuthGuard', () => {
  let guard: NotAuthGuard;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['isAuthenticated']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: router },
      ]
    });
    guard = TestBed.inject(NotAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not have access', () => {
    mockAuthService.isAuthenticated.and.returnValue(false);

    const route: Partial<ActivatedRouteSnapshot> = {
      queryParams: {}
    }
    const state: Partial<RouterStateSnapshot> = {
      url: './login'
    }

    expect(guard.canActivate(route as ActivatedRouteSnapshot, state as RouterStateSnapshot)).toBeTruthy();
  });

  it('should have access and redirect to dashboard page', () => {
    mockAuthService.isAuthenticated.and.returnValue(true);

    const route: Partial<ActivatedRouteSnapshot> = {
      queryParams: {}
    }
    const state: Partial<RouterStateSnapshot> = {
      url: './login'
    }

    guard.canActivate(route as ActivatedRouteSnapshot, state as RouterStateSnapshot)

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
