import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthCredentials, LoginUserResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private httpClient: HttpClient) {}
  signIn(credentials: AuthCredentials): Observable<LoginUserResponse> {
    const { email, password } = credentials;
    return this.httpClient.post<LoginUserResponse>(
      'http://localhost:3000/account',
      {
        email,
        password,
      }
    );
  }
}
