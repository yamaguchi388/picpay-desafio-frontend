import { IUser } from './user';

export interface ICredentials extends Pick<IUser, 'email' | 'password'> {}
