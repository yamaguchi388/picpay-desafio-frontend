import { Payment } from "./payment.model";

export class PaymentResponse {
  totalPages: number;
  payments: Array<Payment>;

  constructor(totalPages, payments) {
    this.totalPages = totalPages;
    this.payments = payments;
  }
}
