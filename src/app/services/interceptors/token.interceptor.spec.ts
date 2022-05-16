import { TestBed } from '@angular/core/testing';
import { UserService } from '../user.service';

import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  const userServiceStub = {};
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenInterceptor,
      { provide: UserService, useValue: userServiceStub }
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
