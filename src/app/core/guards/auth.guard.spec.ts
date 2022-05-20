/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';

describe('Service: AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
  });

  xit('should ...', inject([AuthGuard], (authGuard: AuthGuard) => {
    expect(authGuard).toBeTruthy();
  }));
});
