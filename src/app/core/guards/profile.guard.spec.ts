/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfileGuard } from './profile.guard';

describe('Service: ProfileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileGuard]
    });
  });

  it('should ...', inject([ProfileGuard], (profileGuard: ProfileGuard) => {
    expect(profileGuard).toBeTruthy();
  }));
});
