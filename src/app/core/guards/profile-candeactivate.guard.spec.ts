/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfileCanDeactivateGuard } from './profile-candeactivate.guard';

describe('Service: ProfileDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileCanDeactivateGuard]
    });
  });

  it('should ...', inject([ProfileCanDeactivateGuard], (guard: ProfileCanDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
