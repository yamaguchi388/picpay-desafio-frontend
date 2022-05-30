export interface IAuth {
  accessToken: string;
  user: {
    email: string;
    nome: string;
    id: number;
  };
}
