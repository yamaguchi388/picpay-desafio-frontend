import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;
  
  const sessionStoragSpy = jasmine.createSpyObj('window.sessionStorage', ['clear']); 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ SessionService ]
    });
    service = TestBed.inject(SessionService);

    window.sessionStorage.setItem('USER', 'usuario');
    window.sessionStorage.setItem('EMAIL', 'usuario@gmail.com');
    window.sessionStorage.setItem('TOKEN', '0');

  });

  it('Deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar o usuário no storage', () => {
    expect(service.getUsuario()).toBe('usuario');
  });

  it('Deve retornar o email salvo no storage', () => {
    expect(service.getEmail()).toBe('usuario@gmail.com');
  });

  it('Deve retornar o token salvo no storage', () => {
    expect(service.getToken()).toBe('0');
  });

  it('Deve salvar o usuario no storage', () => {
    service.saveUsuario('usuario1', 'usuario1@gmail.com');
    expect(window.sessionStorage.getItem('USER')).toBe('usuario1');
    expect(window.sessionStorage.getItem('EMAIL')).toBe('usuario1@gmail.com');
  });

  it('Deve salvar o token no storage', () => {
    service.saveToken('1');
    expect(window.sessionStorage.getItem('TOKEN')).toBe('1');
  });

  it('Deve verificar se já possui token no storage', () => {
    expect(service.isLogged()).toBeTrue();
  });

  it('Deve limpar o storage', () => {
    service.clearStorage();
    expect(window.sessionStorage.getItem('TOKEN')).toBeNull();
  });
});
