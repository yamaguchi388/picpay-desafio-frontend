import { HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { catchError, Observable } from 'rxjs';
import { UserService } from '../user.service';

import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  const userServiceStub = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenInterceptor,
        { provide: UserService, useValue: userServiceStub },

      ]
    })

    interceptor = TestBed.get(TokenInterceptor);
  });

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });

  describe('should call intercept method', () => {
    it('should call intercept method', () => {
      const next: any = {
        handle: () => {
          return Observable.create(subscriber => {
            subscriber.complete();
          });
        }
      };

      const requestMock = new HttpRequest('GET', '/test');
      const requestUrl = requestMock.url.split('/');

      spyOn(next, 'handle').and.callFake(() => { });
      const error = {
        status: 401,
      };

      interceptor.intercept(requestMock, next);
    });
  });
});
