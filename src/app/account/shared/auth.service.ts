import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user: any){
    debugger;
    return new Promise((resolve) => {
      window.localStorage.setItem('token', 'meu-token');
      resolve(true);
    });
  }

  createAccount(account: any) {
    return new Promise((resolve) => {
      resolve(true);
    })
  }
}
