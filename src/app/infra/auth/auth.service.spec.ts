import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

const credentialsKey = 'credentials';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });

    authService = TestBed.get(AuthService);
  });

  afterEach(() => {
    localStorage.removeItem(credentialsKey);
    sessionStorage.removeItem(credentialsKey);
  });

  it('deve ser criado', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should return user credentials', () => {
      const user = {
        id: '1',
        name: 'test',
        email: 'test@test.com.br',
        token: '123',
      };

      authService.credentials = user;

      expect(authService.credentials).toBeDefined();
      expect(authService.credentials.token).toBeDefined();
    });

    it('should authenticate user', () => {
      const user = {
        id: '1',
        name: 'test',
        email: 'test@test.com.br',
        token: '123',
      };

      authService.credentials = user;

      expect(authService.isAuthenticated()).toBe(true);
    });
  });

  describe('logout', () => {
    it('should clean user credentials', () => {
      const user = {};

      authService.credentials = user;

      expect(authService.isAuthenticated()).toBe(false);
      expect(authService.credentials).toEqual({});
    });
  });
});
