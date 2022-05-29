import { Payment } from 'src/app/shared/types/payments/payment.type';
import { Payments } from 'src/app/shared/types/payments/payments.type';
export type PaymentStateModel = {
  payments: Payments;
  selectedPayment: Payment;
  paymentsQuantity: number;
};
