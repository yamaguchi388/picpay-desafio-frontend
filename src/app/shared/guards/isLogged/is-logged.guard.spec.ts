import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IsLoggedGuard } from './is-logged.guard';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

describe('IsLoggedGuard', () => {
  let guard: IsLoggedGuard;
  let userService: UserService;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
    });

    guard = TestBed.inject(IsLoggedGuard);
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should permit load when user is Logged', () => {
    spyOn(userService, 'getLoggedUser').and.returnValue({
      id: 0,
      name: 'usuario',
      email: 'email@email.com',
      password: 'mockuserpass',
    });

    spyOn(authService, 'logout');
    spyOn(router, 'navigate');

    const result = guard.canLoad();

    expect(result).toBeTruthy();
    expect(userService.getLoggedUser).toHaveBeenCalledTimes(1);
    expect(authService.logout).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect user to sign-in when is not logged ', () => {
    spyOn(userService, 'getLoggedUser').and.returnValue(null);

    spyOn(authService, 'logout');
    spyOn(router, 'navigate');

    const result = guard.canLoad();

    expect(result).toBeFalsy();
    expect(userService.getLoggedUser).toHaveBeenCalledTimes(1);

    expect(authService.logout).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/sign-in']);
  });
});
