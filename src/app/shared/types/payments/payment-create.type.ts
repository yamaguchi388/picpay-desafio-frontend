import { Payment } from './payment.type';

export type PaymentCreate = Required<Omit<Payment, 'id'>>;
