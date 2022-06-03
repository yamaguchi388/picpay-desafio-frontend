import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiServer: string = environment.apiAccount;

  constructor(private httpClient: HttpClient) { }

  public getAccount(): Observable<Account> {
    return this.httpClient.get<Account>(this.apiServer);
  }
  
}
