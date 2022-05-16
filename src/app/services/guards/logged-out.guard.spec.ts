import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LoggedOutGuard } from './logged-out.guard';

describe('LoggedOutGuard', () => {
  let guard: LoggedOutGuard;
  const httpClientStub = {};
  const routerStub = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        { provide: HttpClient, useValue: httpClientStub },
        { provide: Router, useValue: routerStub }
      ],
    });
    guard = TestBed.inject(LoggedOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
