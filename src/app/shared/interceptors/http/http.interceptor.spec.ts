import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { HttpsInterceptor } from './http.interceptor';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

describe('HttpsInterceptor', () => {
  let interceptor: HttpInterceptor;
  let userService: UserService;
  let authService: AuthService;
  let toastr: ToastrService;
  let router: Router;

  let next: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [HttpsInterceptor],
    });

    interceptor = TestBed.inject(HttpsInterceptor);
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    toastr = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);

    requestMock = new HttpRequest('GET', 'http://localhost:3000/account');
    next = {
      handle: () => () => {},
    };
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should return next handle when the route is login', () => {
    spyOn(userService, 'getLoggedUser').and.returnValue({
      id: 0,
      name: 'dummy user',
      email: 'dummy_user@email.com',
      password: '123',
    });

    spyOn(authService, 'signIn');
    spyOn(authService, 'logout');
    spyOn(toastr, 'info');
    spyOn(router, 'navigate');

    spyOn(next, 'handle').and.returnValue(
      new Observable((subscriber) => {
        subscriber.complete();
      })
    );

    const requestMock = new HttpRequest('GET', 'http://localhost:3000/account');

    interceptor.intercept(requestMock, next).subscribe();

    expect(userService.getLoggedUser).toHaveBeenCalledTimes(1);
    expect(next.handle).toHaveBeenCalledTimes(1);
    expect(next.handle).toHaveBeenCalledWith(requestMock);

    expect(authService.signIn).not.toHaveBeenCalled();
    expect(toastr.info).not.toHaveBeenCalled();
    expect(authService.logout).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should call authService to check if the user is authenticated correctly and call next handle method', () => {
    const mockUser = {
      id: 0,
      name: 'dummy user',
      email: 'dummy_user@email.com',
      password: '123',
    };

    spyOn(userService, 'getLoggedUser').and.returnValue(mockUser);

    spyOn(authService, 'signIn').and.returnValue(of(mockUser));
    spyOn(authService, 'logout');
    spyOn(toastr, 'info');
    spyOn(router, 'navigate');

    spyOn(next, 'handle').and.returnValue(
      new Observable((subscriber) => {
        subscriber.complete();
      })
    );

    const requestMock = new HttpRequest(
      'GET',
      'http://localhost:3000/payments'
    );

    interceptor.intercept(requestMock, next).subscribe();

    expect(userService.getLoggedUser).toHaveBeenCalledTimes(1);
    expect(next.handle).toHaveBeenCalledTimes(1);
    expect(next.handle).toHaveBeenCalledWith(requestMock);
    expect(authService.signIn).toHaveBeenCalled();

    expect(toastr.info).not.toHaveBeenCalled();
    expect(authService.logout).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should call authService to check if the user is authenticated correctly and throw error with user not found', () => {
    const mockUser = {
      id: 0,
      name: 'dummy user',
      email: 'dummy_user@email.com',
      password: '123',
    };

    spyOn(userService, 'getLoggedUser').and.returnValue(mockUser);

    spyOn(authService, 'signIn').and.callFake(() => {
      const errors = ['Usuário não encontrado.'];

      return throwError(
        new HttpErrorResponse({
          error: {
            status: HttpStatusCode.Unauthorized,
            errors,
          },
        })
      );
    });

    spyOn(authService, 'logout');
    spyOn(toastr, 'info');
    spyOn(router, 'navigate');

    spyOn(next, 'handle');

    const requestMock = new HttpRequest(
      'GET',
      'http://localhost:3000/payments'
    );

    interceptor.intercept(requestMock, next).subscribe({
      error: () => {
        expect(userService.getLoggedUser).toHaveBeenCalledTimes(1);
        expect(authService.signIn).toHaveBeenCalled();
        expect(toastr.info).toHaveBeenCalled();
        expect(authService.logout).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalled();

        expect(next.handle).not.toHaveBeenCalled();
      },
    });
  });
});
