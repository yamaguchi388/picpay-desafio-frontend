import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserEntity } from 'src/app/domain/entity/user-entity';
import { IUsersRepository } from 'src/app/domain/interfaces/repositories/iusers-repository';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersRepositoryService implements IUsersRepository {

  constructor(
    private http: HttpClient
  ) { }

  login(param: UserEntity): Observable<any> {
    return this.http.get(`${environment.serverUrl}/users?email=${param.email}&password=${param.password}`);
  }

  logout(): Observable<boolean> {
    return of(true);
  }
}
