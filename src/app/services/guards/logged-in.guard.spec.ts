import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LoggedInGuard } from './logged-in.guard';

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;
  const httpClientStub = {};
  const routerStub = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        { provide: HttpClient, useValue: httpClientStub },
        { provide: Router, useValue: routerStub }
      ],
    });
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
