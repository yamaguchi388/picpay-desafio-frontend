import { PaginationFilters } from 'src/app/shared/types/pagination-filters.type';
import { Payment } from 'src/app/shared/types/payments/payment.type';
import { PaymentCreate } from 'src/app/shared/types/payments/payment-create.type';
import { PaymentFilter } from 'src/app/shared/types/payments/payment-filter.type';
import { PaymentUpdate } from 'src/app/shared/types/payments/payment-update.type';
/* eslint-disable no-unused-vars */
export class GetPayments {
  static readonly type = '[payment] getAllPayments';
  constructor(
    public paginationFilters?: PaginationFilters,
    public paymentFilter?: PaymentFilter,
    public _sort?: string,
    public _order?: string
  ) {}
}

export class UpdatePayment {
  static readonly type = '[payment] updatePayment';
  constructor(public paymentUpdate: PaymentUpdate, public id: number) {}
}

export class CreatePayment {
  static readonly type = '[payment] createPayment';
  constructor(public paymenCreate: PaymentCreate) {}
}

export class DeletePayment {
  static readonly type = '[payment] deletePayment';
  constructor(public id: number) {}
}

export class SetPaymentToEditOrRemove {
  static readonly type = '[payment] setPaymentToEditOrRemove';
  constructor(public payment: Payment) {}
}

export class ResetPaymentToEditOrRemove {
  static readonly type = '[payment] resetPaymentToEditOrRemove';
}
