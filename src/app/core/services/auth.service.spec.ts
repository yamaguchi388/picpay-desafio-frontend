import { HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { credentialsMock } from '../mocks/credentials.mock';
import { userMock } from '../mocks/user.mock';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  const snackbarService: jasmine.SpyObj<SnackbarService> =
    jasmine.createSpyObj<SnackbarService>('SnackbarService', {
      openSnackBar: undefined,
    });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
      ],
      providers: [{ provider: SnackbarService, useValue: snackbarService }],
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
    spyOn(service['user$'], 'next');
    spyOn(service['router'], 'navigateByUrl');

    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    expect(service['user$'].next).toHaveBeenCalledWith(null);
    expect(service['router'].navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
