import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  public getUser(email: string, password: string): Observable<userModel> {
    const params = new HttpParams()
    .set('email', email)
    .set('password',password)
    return this.http.get<userModel>(environment.accounts_url, { params });
  }
}
