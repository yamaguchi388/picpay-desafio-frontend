import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAccountInfo } from '../models/user-account-info';
import { LoginCredentials } from '../models/login-credentials';
import { SessionManagerService } from './session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_API_URL: string = 'http://localhost:3000/account';

  constructor(private http: HttpClient, private sessionManager: SessionManagerService) { }

  authenticate(credentials: LoginCredentials): Observable<any> {
    
    // Using GET method due to the fake API.
    // A real application should use a POST method and
    // erform the user validation on the back-end.
    return this.http.get(this.BASE_API_URL)
      .pipe(map(
        (response: UserAccountInfo[]) => {
          console.log(response);
          const user = response.find((account: UserAccountInfo) => {
            return account.email === credentials.email && account.password === credentials.password;
          });
          
          if(user){
            const sessionAuthToken = `user-${user.email}-${user.name}-token`;

            this.sessionManager.saveToken(sessionAuthToken);
            this.sessionManager.saveUser(user);

            return 'success';
          } else {
            return 'invalid';
          }
        },
        (error: any) => {
          console.log(error);
          return 'error';
        }
      ));
  }

  logout(): void {
    this.sessionManager.clearSessionStorage();
  }

  isAuthenticated() {
    return this.sessionManager.getToken() !== null;
  }
}
