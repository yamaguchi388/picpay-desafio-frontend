import { Injectable } from '@angular/core';

const TOKEN = 'TOKEN';
const USUARIO = 'USER';
const EMAIL = 'EMAIL';

@Injectable()
export class SessionService {

  constructor() { }

  getUsuario(): string | null {
    return window.sessionStorage.getItem(USUARIO);
  }

  getEmail(): string | null {
    return window.sessionStorage.getItem(EMAIL);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN);
  }

  saveUsuario(user: string, email: string): void {
    window.sessionStorage.removeItem(USUARIO);
    window.sessionStorage.setItem(USUARIO, user);
    window.sessionStorage.setItem(EMAIL, email);
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, token);
  }

  isLogged(): boolean {
   return this.getToken() !== null;
  }

  clearStorage(): void {
    window.sessionStorage.clear();
  }

}
