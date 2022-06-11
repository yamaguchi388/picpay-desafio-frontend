import { TestBed } from '@angular/core/testing';
import { userModel } from './../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useFactory: routerStub }]
    });
    service = TestBed.inject(AuthService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
