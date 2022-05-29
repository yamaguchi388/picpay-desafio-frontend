/* eslint-disable no-undef */
import { NgxsModule, Store } from '@ngxs/store';
import { AuthGuard } from './auth.guard';
import { AuthState } from './../state/states/auth.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: Store;

  const AUTH_STATE = {
    isAuthenticated: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([AuthState]),
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      auth: AUTH_STATE
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('isAuthenticated should return false', () => {
    expect(guard.isAuthenticated).toBeFalsy();
  });

  it('should block access and redirect to auth route when isAuthenticated is false', () => {
    const navigateToAuthUrlSpy = spyOn(guard, 'navigateToAuthUrl');
    expect(guard.canActivate()).toBe(false);
    expect(navigateToAuthUrlSpy).toHaveBeenCalledTimes(1);
  });
});
