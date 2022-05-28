import { PaginationFilters } from 'src/app/shared/types/pagination-filters.type';
import { PaymentUpdate } from 'src/app/shared/types/payments/payment-update.type';
/* eslint-disable no-unused-vars */
export class GetPayments {
  static readonly type = '[payment] getAllPayments';
  constructor(public paginationFilters?: PaginationFilters) {}
}

export class UpdatePayment {
  static readonly type = '[payment] updatePayment';
  constructor(public paymentUpdate: PaymentUpdate) {}
}
