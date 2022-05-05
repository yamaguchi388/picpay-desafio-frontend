import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAccountInfo } from '../models/user-account-info';
import { LoginCredentials } from '../models/login-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_API_URL: string = 'http://localhost:3000/account';
  authStatus: string = '';

  //implementar OnInit e verificar o session storage se tem token

  constructor(private http: HttpClient) { }

  authenticate(credentials: LoginCredentials): string {
    
    // Using GET method due to the fake API.
    // A real application should use a POST method and
    // erform the user validation on the back-end.
    this.http.get(this.BASE_API_URL)
      .subscribe(
        (response: UserAccountInfo[]) => {
          console.log(response);
          const user = response.find((account: UserAccountInfo) => {
            return account.email === credentials.email && account.password === credentials.password;
          });
          
          if(user){
            // create token and save on session storage
            this.authStatus = 'success';
          } else {
            this.authStatus = 'invalid';
          }
        },
        error => {
          console.log(error);
          this.authStatus = 'error';
        }
      );
      return this.authStatus;
  }

  logout(): void {
    // localStorage.removeItem('access_token');
  }
}
