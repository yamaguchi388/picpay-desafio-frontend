import { Payment } from './payment.type';

export type PaymentFilter = Partial<
  Pick<Payment, 'value' | 'date' | 'title' | 'isPayed' | 'name'>
>;
