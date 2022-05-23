import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentsController } from 'src/app/domain/interfaces/controllers/ipayments-controller';
import { PaymentEntity } from 'src/app/domain/interfaces/entity/payment-entity';
import { IPaymentsRepository } from 'src/app/domain/interfaces/repositories/ipayments-repository';

@Injectable({
  providedIn: 'root',
})
export class PaymentsControllerService implements IPaymentsController {
  constructor(
    private paymentsRepository: IPaymentsRepository
  ) {}

  getPayments(filters?: string): Observable<PaymentEntity[]> {
    return this.paymentsRepository.getPayments(filters);
  }

  createPayment(payment: PaymentEntity): Observable<PaymentEntity> {
    return this.paymentsRepository.createPayment(payment);
  }

  updatePayment(id: string, payment: PaymentEntity): Observable<PaymentEntity> {
    return this.paymentsRepository.updatePayment(id, payment);
  }

  deletePayment(id: string): Observable<PaymentEntity> {
    return this.paymentsRepository.deletePayment(id);
  }
}
