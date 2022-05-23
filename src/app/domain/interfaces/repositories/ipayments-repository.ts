import { Observable } from 'rxjs';
import { PaymentEntity } from '../entity/payment-entity';

export abstract class IPaymentsRepository {
  abstract getPayments(filters?: string): Observable<PaymentEntity[]>;
  abstract createPayment(payment: PaymentEntity): Observable<PaymentEntity>;
  abstract updatePayment(id: string, payment: PaymentEntity): Observable<PaymentEntity>;
  abstract deletePayment(id: string): Observable<PaymentEntity>;
}