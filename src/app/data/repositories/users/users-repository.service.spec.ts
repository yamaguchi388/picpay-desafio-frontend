import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UsersRepositoryService } from './users-repository.service';

describe('UsersRepositoryService', () => {
  let service: UsersRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(UsersRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
