import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SessionService } from '../session/session.service';
import { Base } from '../../enums/entities.index';
import { map } from 'rxjs/operators';
import { IUser } from '../../entities/entities.index';

@Injectable()
export class LoginService {

  constructor(private readonly http: HttpClient, private readonly session: SessionService) { }
  
  login(email: string, senha: string): Observable<boolean> {
    return this.http.get<IUser[]>(`${Base.URL_BASE}/account?email=${email}&password=${senha}`).pipe(map((user) => {
      if(user.length){
        this.session.saveUsuario(user[0].name, user[0].email);
        this.session.saveToken(user[0].id.toString());
        return true;
      }

      return false;
    }));
  }
  
  logout(): void {
    this.session.clearStorage();
  }

}
