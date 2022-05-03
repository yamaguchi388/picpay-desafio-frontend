import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:4214/account';

  constructor(
    private http: HttpClient
  ) { }

  public getUser(email: string, password: string): Observable<userModel> {
    const params = new HttpParams()
    .set('email', email)
    .set('password',password)
    return this.http.get<userModel>(this.url, { params });
  }
}
