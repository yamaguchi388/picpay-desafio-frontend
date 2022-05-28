import { Payment } from './payment.type';

export type ConfirmPayment = Pick<Payment, 'isPayed'>;
