import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { StorageKeysEnum } from '../../enums';
import { IUser } from '../../interfaces';
import { HttpService } from '../http/http.service';
import { StorageService } from '../storage/storage.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [HttpService, AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user object when call method sign in in authService', () => {
    const mockUser = {
      id: 0,
      name: 'Dummy User',
      email: 'dummy@email.com',
      password: 'dummy',
    };
    const mockUsers: IUser[] = [mockUser];

    service.signIn(mockUser).subscribe((result) => {
      expect(result.email).toEqual(mockUser.email);
      expect(result.name).toEqual(mockUser.name);
      expect(result.id).toEqual(mockUser.id);
    });

    const mockReq = httpMock.expectOne(
      `${environment.apiUrl}/account?email=dummy%40email.com&password=dummy`
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(mockUsers);

    httpMock.verify();
  });

  it('should throw error when user is not found', () => {
    const credentials = { email: 'dummy@email.com', password: 'dummy' };
    const mockUsers: IUser[] = [];

    const errorMessage = 'Usuário não encontrado.';
    service.signIn(credentials).subscribe({
      error: ({ error }: HttpErrorResponse) => {
        expect(error.status).toEqual(HttpStatusCode.Unauthorized);
        expect(error.errors[0]).toEqual(errorMessage);
      },
    });

    const mockReq = httpMock.expectOne(
      `${environment.apiUrl}/account?email=dummy%40email.com&password=dummy`
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(mockUsers);

    httpMock.verify();
  });

  it('should remove user value on storage when call logout method', () => {
    spyOn(storageService, 'removeItem');

    service.logout();

    expect(storageService.removeItem).toHaveBeenCalledTimes(1);
    expect(storageService.removeItem).toHaveBeenCalledWith(
      StorageKeysEnum.USER
    );
  });
});
