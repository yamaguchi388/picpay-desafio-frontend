import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { StorageKeysEnum } from '../../enums';
import { IUser } from '../../interfaces';
import { StorageService } from '../storage/storage.service';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should storage user on service', () => {
    const user: IUser = {
      id: 0,
      name: 'dummy email',
      email: 'email@email.com',
      password: 'secret',
    };

    spyOn(storageService, 'setItem');

    service.setUserOnSession(user);

    expect(storageService.setItem).toHaveBeenCalledTimes(1);
    expect(storageService.setItem).toHaveBeenCalledWith(
      StorageKeysEnum.USER,
      user
    );
  });

  it('should uspdate', () => {
    const updatedUser = {
      id: 1,
      name: 'Dummy User',
      email: 'dummy@email.com',
      password: 'dummy',
    };
    const mockUsers: IUser[] = [updatedUser];

    service.update(updatedUser).subscribe((result) => {
      expect(result.email).toEqual(updatedUser.email);
      expect(result.name).toEqual(updatedUser.name);
      expect(result.id).toEqual(updatedUser.id);
    });

    const mockReq = httpMock.expectOne(
      `${environment.apiUrl}/account/${updatedUser.id}`
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.method).toEqual('PUT');

    mockReq.flush(updatedUser);

    httpMock.verify();
  });
});
