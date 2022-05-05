import { Injectable } from '@angular/core';
import { UserAccountInfo } from '../models/user-account-info';

const TOKEN_KEY = 'auth-paygo-token';
const USER_KEY = 'auth-paygo-user';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  constructor() { }

  clearSessionStorage(): void {
    window.sessionStorage.clear();
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: UserAccountInfo): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): UserAccountInfo {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }
}
