import { TestBed } from '@angular/core/testing';

import { UsersControllerService } from './users-controller.service';

describe('UsersControllersService', () => {
  let service: UsersControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UsersControllerService, useValue: UsersControllerService }
      ]});
    service = TestBed.inject(UsersControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
