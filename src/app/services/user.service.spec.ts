import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserModel } from '../models/user.model';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const httpClientStub = {
    get: () => of({}),
  };
  const routerStub = {
    navigate: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call login method', () => {
    it('exists user', () => {
      const response = [
        {
          "id": 0,
          "name": "usuario",
          "email": "usuario@gmail.com",
          "password": "usuario"
        }
      ];
      spyOn(httpClientStub, 'get').and.returnValues(of(response));

      const user = new UserModel();
      user.name = "usuario";
      user.email = "usuario@gmail.com";
      user.password = "usuario";

      const userLogin = service.login(user);

      expect(httpClientStub.get).toHaveBeenCalled();
      userLogin.subscribe((res) => {
        spyOn(res, 'find').and.callFake(() => true);
        expect(res).toBe(response);
      });
    });

    it('not exists user', () => {
      const response = [
        {
          "id": 0,
          "name": "usuario",
          "email": "usuario@gmail.com",
          "password": "usuario"
        }
      ];
      spyOn(httpClientStub, 'get').and.returnValues(of(response));

      const userLogin = service.login(new UserModel());

      expect(httpClientStub.get).toHaveBeenCalled();
      userLogin.subscribe((res) => {
        spyOn(res, 'find').and.callFake(() => true);
        expect(res).toBe(response);
      });
    });
  });

  it('should call logout method', () => {
    spyOn(localStorage, 'clear').and.callThrough();
    spyOn(routerStub, 'navigate').and.callThrough();

    service.logout();

    expect(localStorage.clear).toHaveBeenCalled();
    expect(routerStub.navigate).toHaveBeenCalled();
  });

  it('should call obterTokenUsuario get', () => {
    spyOn(localStorage, 'getItem').and.callThrough();

    service.obterTokenUsuario;

    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('should call logged get', () => {
    spyOn(localStorage, 'getItem').and.callThrough();

    service.logged;

    expect(localStorage.getItem).toHaveBeenCalled();
  });
});
