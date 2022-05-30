export interface IUser {
  id?: number;
  email: string;
  password: string;
  passwordConfirmation?: string;
  nome: string;
}

export interface ICreateUser {
  nome: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}
