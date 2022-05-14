import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.API_URL;

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) {}

  setUser(user: User) {
    const encryptedUser = btoa(JSON.stringify(user));
    localStorage.setItem('user', encryptedUser);
  }

  getCurrentUser(): User {
    const encryptedUser = localStorage.getItem('user');
    const decryptedUser = atob(encryptedUser);
    return JSON.parse(decryptedUser);
  }

  login({ email, password }: { email: string; password: string }): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.API_URL}/account?email=${email}&password=${password}`).pipe(
      switchMap((value) => {
        if (!value.length) {
          return throwError('No users found');
        }
        return of(value);
      }),
      catchError((err) => throwError(err)),
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
