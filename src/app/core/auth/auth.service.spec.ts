import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

const fakeUser = { email: ' usuario@gmail.com', name: 'usuario', password: 'usuario', id: 0 };

describe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: AuthService;

  const mockUser = {
    id: 0,
    name: 'usuario',
    email: 'usuario@gmail.com',
    password: 'usuario',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new AuthService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be authenticate', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of([fakeUser]));

    service.authenticate({ email: 'usuario@gmail.com', password: 'usuario' }).subscribe({
      next: user => {
        expect(user).withContext('expected user').toEqual(fakeUser);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);

    expect(service.getUser()).toBeTruthy();
  });

  it('should get error if login fails', (done: DoneFn) => {
    const fakeCredentials = { email: fakeUser.email, password: fakeUser.password };

    httpClientSpy.get.and.returnValue(of([]));

    service.authenticate(fakeCredentials).subscribe({
      next: users => done.fail(),
      error: error  => {
        expect(error.message).toContain('404');
        done();
      }
    });

    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should get a user', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of([fakeUser]));

    service.authenticate({ email: 'usuario@gmail.com', password: 'usuario' }).subscribe({
      next: user => done(),
      error: done.fail
    });

    expect(service.getUser()).withContext('expected user').toEqual(fakeUser);
  });

  it('should verify if user is authenticate', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of([fakeUser]));

    service.authenticate({ email: 'usuario@gmail.com', password: 'usuario' }).subscribe({
      next: user => done(),
      error: done.fail
    });

    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should log out', () => {
    service.logout();

    expect(localStorage.getItem('payfriends.user')).toBe(null);
  });
});
