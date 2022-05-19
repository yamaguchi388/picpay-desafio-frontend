import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SessionService } from '../service.index';

import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../entities/entities.index';
import { of } from 'rxjs';

const user: IUser[] = [{
  id: 0,
  name: 'usuario',
  email: 'usuario@gmail.com',
}];

const userEmpty: IUser[] = [];

describe('LoginService', () => {
  let service: LoginService;
  let http: HttpClient;

  const SessionServiceSpy = jasmine.createSpyObj<SessionService>(['saveUsuario', 'saveToken', 'clearStorage']); 
  SessionServiceSpy.saveUsuario('usuario', 'usuario@gmail.com');
  SessionServiceSpy.saveToken('0');

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ],
    providers: [
      LoginService,
      {
        provide: SessionService,
        useValue: SessionServiceSpy
      }
    ]});
    service = TestBed.inject(LoginService);
    http = TestBed.inject(HttpClient);
  });


  it('Deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('Deve logar do sistema', () => {
    spyOn(http, 'get').and.returnValue(of(user));
    service.login('usuario@gmail.com', 'senha').subscribe((user) => {
      expect(user).toBeTrue();
    });
  });

  it('Deve não encontrar o usuario para logar do sistema', () => {
    spyOn(http, 'get').and.returnValue(of(userEmpty));
    service.login('usuario@gmail.com', 'senha').subscribe((user) => {
      expect(user).toBeFalse();
    });
  });

  it('Deve deslogar do sistema', () => {
    service.logout();
    expect(SessionServiceSpy.clearStorage).toHaveBeenCalled();
  });
});
