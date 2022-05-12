import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, of, tap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { UserModel } from '../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  logar(user: UserModel): Observable<any> {
    return this.httpClient.post<any>(environment.logged_users, user).pipe(
      tap((resposta) => {
        debugger
        if (!resposta) return
        localStorage.setItem(
          'token',
          btoa(JSON.stringify('TokenQueSeriaGeradoPelaAPI')),
        ) //resposta['token'])));
        localStorage.setItem('user', btoa(JSON.stringify(resposta['email'])))
        this.router.navigate([''])
      }),
    )
  }

  deslogar() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

  get logged(): boolean {
    return localStorage.getItem('token') ? true : false
  }
}
