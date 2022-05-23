import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthData } from './../../shared/models/auth-data';
import { User } from 'src/app/shared/models/user';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  authenticate({ email, password }: AuthData) {
    return this.httpClient.get<User[]>(`${API_URL}account?email=${email}&password=${password}`)
      .pipe(
        map((res: User[]) => {
          if (!res.length) {
            throw new Error('404');
          }

          this.saveUserInStorage(res[0]);

          return res[0];
        })
      );
  }

  saveUserInStorage(user: User): void {
    /**
     * Em um cenário real, o correto seria salvar as informações do token.
     * Esse token seria sempre capturado nos interceptors das requests,
     * para enviar no header das rotas protegidas e validar o acesso.
     */
    localStorage.setItem('payfriends.user', JSON.stringify(user));
  }

  getUser() {
    const storageItem = localStorage.getItem('payfriends.user');
    return JSON.parse(storageItem);
  }

  isAuthenticated() {
    /**
     * Em um cenário real, o token seria capturado para verificar se o usuário já realizou o login.
     */
    const user = this.getUser();
    return !!user;
  }

  logout() {
    /**
     * Em um cenário real, o token seria removido.
     */
    localStorage.removeItem('payfriends.user');
  }
}
