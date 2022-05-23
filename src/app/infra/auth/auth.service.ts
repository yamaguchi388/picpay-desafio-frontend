import { Injectable } from '@angular/core';
import { UserEntity } from '../../domain/entity/user-entity';

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user!: UserEntity;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);

    if (savedCredentials) {
      this.user = JSON.parse(savedCredentials);
    }
  }

  isAuthenticated(): boolean {
    return !!this.credentials?.token;
  }

  get credentials(): UserEntity {
    return this.user;
  }

  set credentials(credentials: UserEntity) {
    this.user = credentials || null;

    if (credentials) {
      localStorage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      localStorage.removeItem(credentialsKey);
    }
  }
}
