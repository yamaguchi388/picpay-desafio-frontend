import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let router = {
    navigate: jasmine.createSpy('navigate'),
  };

  const mockUser = {
    id: 0,
    name: 'usuario',
    email: 'usuario@gmail.com',
    password: 'usuario',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: Router, useValue: router }],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should get current User', () => {
    authService.setUser(mockUser);
    const currentUser = authService.getCurrentUser();
    expect(currentUser).toBeTruthy();
  });

  it('should set user', () => {
    const fakeUser = { email: ' usuario@gmail.com', name: 'usuario', password: 'usuario', id: 0 };

    authService.setUser(fakeUser);

    expect(localStorage.getItem('user')).toEqual(btoa(JSON.stringify(fakeUser)));
  });

  it('should login', () => {
    const fakeUser = { email: ' usuario@gmail.com', name: 'usuario', password: 'usuario', id: 0 };

    httpClientSpy.get.and.returnValue(of([fakeUser]));

    authService.login({ email: 'usuario@gmail.com', password: 'usuario' }).subscribe(([user]) => {
      expect(user).withContext('expected users').toEqual(fakeUser);
    });
  });

  it('should login with errors', () => {
    const fakeCredentials = { email: ' usuario@gmail.com', password: 'usuario' };
    const { email, password } = fakeCredentials;
    let errorHappened;

    authService.login(fakeCredentials).subscribe(
      () => {},
      () => {
        errorHappened = true;
      },
    );

    const req = httpMock.expectOne(`${environment.API_URL}/account?email=${email}&password=${password}`);
    req.flush('', { status: 404, statusText: 'Not Found' });

    expect(errorHappened).toBeTrue();
  });

  it('should return empty array on login', () => {
    const fakeCredentials = { email: ' usuario@gmail.com', password: 'usuario' };
    const { email, password } = fakeCredentials;

    authService.login(fakeCredentials).subscribe();

    const req = httpMock.expectOne(`${environment.API_URL}/account?email=${email}&password=${password}`);
    req.flush([], { status: 200, statusText: 'success' });
  });

  it('should return user on login', () => {
    const fakeCredentials = { email: ' usuario@gmail.com', password: 'usuario' };
    const { email, password } = fakeCredentials;

    authService.login(fakeCredentials).subscribe();

    const req = httpMock.expectOne(`${environment.API_URL}/account?email=${email}&password=${password}`);
    req.flush([mockUser], { status: 200, statusText: 'success' });
  });

  it('should logout', () => {
    authService.logout();

    expect(localStorage.getItem('user')).toBe(null);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
