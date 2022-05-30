import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = environment.baseURL + '/account';

  private user$ = new BehaviorSubject<User>(this.getUserFromStorage());

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private snackbarService: SnackbarService
  ) {}

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

        this.snackbarService.openSnackBar('Usuário não encontrado!', null);
        throw new Error('Usuário não encontrado!');
      }),
      tap((user) => {
        this.user$.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      }),
      catchError(() => {
        this.snackbarService.openSnackBar('Erro ao autenticar', null);
        throw new Error('Erro ao autenticar');
      })
    );
  }

  getUserFromStorage(): User {
    return JSON.parse(localStorage.getItem('user')) || null;
  }

  logout(): void {
    this.user$.next(null);
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
