import { Payment } from './payment.type';

export type PaymentUpdate = Partial<
  Pick<Payment, 'username' | 'value' | 'date' | 'title' | 'isPayed'>
>;
