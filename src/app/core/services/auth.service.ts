import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = environment.baseURL + '/account';

  private user$ = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) {}

  getUser(): Observable<User> {
    return this.user$.asObservable();
  }

  login(credentials: Login): Observable<User> {
    const params = new HttpParams({
      fromObject: { ...credentials },
    });

    return this.httpClient.get<User[]>(this.apiURL, { params }).pipe(
      map((users) => {
        if (users.length) {
          return users[0];
        }

        throw new Error('Usuário não encontrado!');
      }),
      tap((user) => {
        this.user$.next(user);
        localStorage.setItem('token', 'token_from_api');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
