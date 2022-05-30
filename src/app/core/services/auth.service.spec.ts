import { HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { credentialsMock } from '../mocks/credentials.mock';
import { userMock } from '../mocks/user.mock';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should do login', () => {
    service.login(credentialsMock).subscribe((user: User) => {
      expect(user).toEqual(userMock);
    });

    const queryStringParams = new HttpParams({
      fromObject: { ...credentialsMock },
    });

    httpController
      .expectOne(service.apiURL + '?' + queryStringParams)
      .flush([userMock]);
  });

  it('should do logout', () => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
