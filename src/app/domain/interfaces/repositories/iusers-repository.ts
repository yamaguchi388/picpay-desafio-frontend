import { Observable } from 'rxjs';
import { UserEntity } from '../../entity/user-entity';

export abstract class IUsersRepository {
  abstract login(param: UserEntity): Observable<UserEntity[]>;
  abstract logout(): Observable<boolean>;
}
