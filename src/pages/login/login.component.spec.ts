import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import {AuthService} from 'src/services/account/auth.service';
import { HttpClient } from '@angular/common/http';

describe('LoginComponent', () => {
  let authService: AuthService;
  let http : HttpClient;
  let router: Router;
  let component = new LoginComponent(authService, router);

  beforeEach(() => {
    authService = new AuthService(http);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
