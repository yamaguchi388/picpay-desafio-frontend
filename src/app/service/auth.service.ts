import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface Account {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = `${environment.api}/account`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  get(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.api}`);
  }

  login(email: string, password: string): Observable<Account[]> {
    let params = new HttpParams();
    if (email) {
      params = params.append('email', email);
    }
    if (password) {
      params = params.append('password', password);
    }
    params = params.append('_limit', 1);
    return this.http.get<Account[]>(`${this.api}`, { params })
      .pipe(
        map((users: Account[]) => {
          if (users.length > 0) {
            return users;
          }
        })
      );
  }

  update(user: Account): Observable<Account> {
    return this.http.put<Account>(`${this.api}/${user.id}`, user)
      .pipe(
        map((account: Account) => {
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
