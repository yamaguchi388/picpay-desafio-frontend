import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/data/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.API_URL;

  constructor(private readonly httpClient: HttpClient) {}

  setUser(user: User) {
    const encryptedUser = btoa(JSON.stringify(user));
    localStorage.setItem('user', encryptedUser);
  }

  getCurrentUser(): User {
    const encryptedUser = localStorage.getItem('user');
    const decryptedUser = atob(encryptedUser);
    return JSON.parse(decryptedUser);
  }

  login({ email, password }): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${this.API_URL}/account?email=${email}&password=${password}`)
      .pipe(catchError((err) => throwError(() => new Error(err))));
  }
}
