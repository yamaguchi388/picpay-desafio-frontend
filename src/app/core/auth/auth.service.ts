import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { User } from 'src/app/models/account.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.API_URL;
  constructor(
    private httpClient: HttpClient,
    private readonly router: Router
  ) {}

  public setUser(user: User) {
    const encryptedUser = btoa(JSON.stringify(user));
    localStorage.setItem('user', encryptedUser);
  }

  public getCurrentUser(): User {
    const encryptedUser = localStorage.getItem('user');
    const decryptedUser = atob(encryptedUser);
    return JSON.parse(decryptedUser);
  }

  public authenticate({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<User[]> {
    return this.httpClient
      .get<User[]>(
        `${this.API_URL}/account?email=${email}&password=${password}`
      )
      .pipe(
        switchMap((value) => {
          if (!value.length) {
            return throwError('Nenhum usuário encontrado');
          }
          return of(value);
        }),
        catchError((err) => throwError(err))
      );
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
