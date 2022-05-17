import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(user: UserModel): Observable<any> {
    return this.httpClient
      .get<any>(environment.logged_users)
      .pipe(
        tap((resposta) => {
          const foundUser = resposta.find(u => u.email === user.email && u.password === user.password);
          if (foundUser) {
            localStorage.setItem(
              'token',
              btoa(JSON.stringify('TokenQueSeriaGeradoPelaAPI')),
            )
            localStorage.setItem('user', btoa(JSON.stringify(resposta['email'])))
            this.router.navigate(['']);
          }
          return;
        }),
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token')))
      : null;
  }

  get logged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
