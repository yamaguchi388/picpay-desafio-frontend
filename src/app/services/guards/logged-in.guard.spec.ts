import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user.service';

import { LoggedInGuard } from './logged-in.guard';

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;
  const httpClientStub = {};
  const routerStub = {
    navigate: () => { },
  };
  const userServiceStub = {
    logged:  null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientStub },
        { provide: Router, useValue: routerStub },
        { provide: UserService, useValue: userServiceStub }
      ],
    });
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('should call canActivate method', () => {
    it('logged', () => {
      userServiceStub.logged =  true;
      const result = guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'testUrl' });
      expect(result).toBe(true);
    });
    it('not logged', () => {
      userServiceStub.logged =  false;
      const result = guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'testUrl' });
      expect(result).toBe(false);
    });
  });
});
