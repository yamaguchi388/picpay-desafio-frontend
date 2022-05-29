import { Accounts } from 'src/app/shared/types/account/accounts.type';
import { Authentication } from 'src/app/shared/types/authentication.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { objectToQueryString } from 'src/app/shared/utils/object-to-query-string.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  accoutUrl: string = environment.account;

  authenticate(authentication: Authentication) {
    const queryString = objectToQueryString(authentication);
    const url = `${this.accoutUrl}${queryString}`;
    return this.http.get<Accounts>(url);
  }
}
