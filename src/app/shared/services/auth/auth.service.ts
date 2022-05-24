import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map, retry, tap } from 'rxjs/operators';
import { Account } from '../../models/account.interface';
import { AppError } from '../../models/app-error.interface';
import { LoginAccount } from '../../state-management/actions/account.actions';
import { Errors } from '../../state-management/actions/error.actions';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API = 'http://localhost:3000/account'

  constructor(
    private http: HttpClient,
    private errorStore: Store<{ error: AppError }>,
    private accountStore: Store<{ account: Account }>,
    private storageService: StorageService
  ) { }

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  login(email: string, password: string): Observable<Account> {
    let params = new HttpParams()
      .set('email', email)
      .set('password', password);
    
    return this.http.get<Account[]>(this.API, {
      headers: this.httpHeaders,
      params
    })
      .pipe(
        retry(3),
        first(),
        map((account: Account[]) => {
          if(account.length > 0) {
            this.accountStore.dispatch(LoginAccount({ account: account[0] }));
            this.storageService.set('user', account[0]);
            return account[0];
          }

          return undefined;
        }),
        catchError((e) => {
          const payload: AppError = {
            description: e.message,
            where: 'AuthService:Login'
          };

          this.errorStore.dispatch(Errors({ payload }))
          return throwError(e);
        })
      );
  }
}
