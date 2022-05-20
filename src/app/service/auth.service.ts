import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

import { AccountObject } from './../models/account-object';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  api = `${environment.api}/account`;
  authenticatedUser = false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  get(): Observable<AccountObject[]> {
    return this.http.get<AccountObject[]>(`${this.api}`);
  }

  login(email: string, password: string): Observable<AccountObject[]> {
    let params = new HttpParams();
    if (email) {
      params = params.append('email', email);
    }
    if (password) {
      params = params.append('password', password);
    }
    params = params.append('_limit', 1);
    return this.http.get<AccountObject[]>(`${this.api}`, { params })
      .pipe(
        map((users: AccountObject[]) => {
          if (users.length > 0) {
            this.authenticatedUser = true;
            return users;
          }
          else {
            console.log('users', users)
            this.authenticatedUser = false;
            return;
          }
        })
      );
  }

  userIsAuthenticated(): boolean {
    return this.authenticatedUser;
  }

  update(user: AccountObject): Observable<AccountObject> {
    return this.http.put<AccountObject>(`${this.api}/${user.id}`, user)
      .pipe(
        map((account: AccountObject) => {
          if (account) {
            return account;
          }
        })
      );
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
