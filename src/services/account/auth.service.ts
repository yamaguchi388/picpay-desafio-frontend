import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
apiURL = 'http://localhost:3000';
validUser = {}; 
userList: Array<object> = [];

  constructor(private http : HttpClient) { }

  login(user: any){
    const {email, password} = user;
    return new Promise((resolve) => {
      let isValidUser = false;
      this.http.get(`${ this.apiURL }/account`)
                 .subscribe((userList) => {
                  isValidUser = Object.values(userList).find((list) => {
                      return (email === list.email) && (password === list.password);
                  })
  
                  if(isValidUser){
                    window.localStorage.setItem('token', 'meu-token');
                    resolve(true);
                  }
                
                  });
    });
  }

  createAccount(account: any) {
    return new Promise((resolve) => {
      resolve(true);
    })
  }
}
