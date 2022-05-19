import { TestBed } from '@angular/core/testing';
import { SessionService } from '../../core.index';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth-guard.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  const SessionServiceSpy = jasmine.createSpyObj<SessionService>(['isLogged']); 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: SessionService,
          useValue: SessionServiceSpy
        }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  it('Deve permitir o acesso', () => {
    SessionServiceSpy.isLogged.and.returnValue(true);

    const route: Partial<ActivatedRouteSnapshot> = {
      queryParams: {}
    }
    const state: Partial<RouterStateSnapshot> = {
      url: './home'
    }
    expect(guard.canActivate(route as ActivatedRouteSnapshot, state as RouterStateSnapshot)).toBeTruthy();
  });

  it('Deve negar o acesso e redirecionar para a tela de login', () => {
    const navigateSpy = spyOn(router, 'navigate');
    SessionServiceSpy.isLogged.and.returnValue(false);

    const route: Partial<ActivatedRouteSnapshot> = {
      queryParams: {}
    }
    const state: Partial<RouterStateSnapshot> = {
      url: './home'
    }

    guard.canActivate(route as ActivatedRouteSnapshot, state as RouterStateSnapshot)

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
