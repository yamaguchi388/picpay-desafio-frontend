import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/app/domain/entity/user-entity';
import { IUsersController } from 'src/app/domain/interfaces/controllers/iusers-controller';
import { IUsersRepository } from 'src/app/domain/interfaces/repositories/iusers-repository';

@Injectable({
  providedIn: 'root'
})
export class UsersControllerService implements IUsersController {

  constructor(
    private usersRepository: IUsersRepository
  ) { }

  login(param: UserEntity): Observable<UserEntity[]> {
      return this.usersRepository.login(param);
  }

  logout(): Observable<boolean> {
    return this.usersRepository.logout();
  }
}
