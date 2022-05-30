export interface IPayment {
  id?: number;
  name: string;
  username: string;
  title: string;
  value: number;
  date: Date;
  image: string;
  isPayed: boolean;
}

export interface ICreatePayment {
  name: string;
  username: string;
  title: string;
  value: number | undefined;
  date: Date;
  image?: string;
  isPayed: boolean;
}
