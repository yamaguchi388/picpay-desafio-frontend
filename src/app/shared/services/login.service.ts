import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './../interfaces/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly urlAccount = 'http://localhost:3000/account';

  private subjUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  login(credentials: {email: string, password: string}): Observable<User> {
    return this.http
      .get<User>(`${this.urlAccount}?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        tap((u: User) => {
          this.subjLoggedIn$.next(true);
          this.subjUser$.next(u);
        })
      )
  }

  logout() {
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
  }
}
