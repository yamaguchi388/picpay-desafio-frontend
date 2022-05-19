import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpMock: HttpTestingController;
  const router = {
    navigate: jasmine.createSpy('navigate'),
  };

  const userDummy = {
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
    authService = TestBed.inject(AuthService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should get current user', () => {
    authService.setUser(userDummy);
    const currentUser = authService.getCurrentUser();
    expect(currentUser).toEqual(userDummy);
  });

  it('should set user', () => {
    authService.setUser(userDummy);
    expect(localStorage.getItem('user')).toEqual(btoa(JSON.stringify(userDummy)));
  });

  it('should login', () => {
    const fakeUser = { email: ' usuario@gmail.com', name: 'usuario', password: 'usuario', id: 0 };

    httpClientSpy.get.and.returnValue(of([fakeUser]));

    authService.authenticate({ email: 'usuario@gmail.com', password: 'usuario' }).subscribe(([user]) => {
      expect(user).withContext('expected users').toEqual(fakeUser);
    });
  });

  it('should login with errors', () => {
    const fakeCredentials = { email: ' usuario@gmail.com', password: 'usuario' };
    const { email, password } = fakeCredentials;
    let errorHappened;

    authService.authenticate(fakeCredentials).subscribe(
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

    authService.authenticate(fakeCredentials).subscribe();

    const req = httpMock.expectOne(`${environment.API_URL}/account?email=${email}&password=${password}`);
    req.flush([], { status: 200, statusText: 'success' });
  });

  it('should return user on login', () => {
    const fakeCredentials = { email: ' usuario@gmail.com', password: 'usuario' };
    const { email, password } = fakeCredentials;

    authService.authenticate(fakeCredentials).subscribe();

    const req = httpMock.expectOne(`${environment.API_URL}/account?email=${email}&password=${password}`);
    req.flush([userDummy], { status: 200, statusText: 'success' });
  });

  it('should logout', () => {
    authService.logout();

    expect(localStorage.getItem('user')).toBe(null);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
