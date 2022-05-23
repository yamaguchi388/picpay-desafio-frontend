import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentEntity } from 'src/app/domain/interfaces/entity/payment-entity';
import { IPaymentsRepository } from 'src/app/domain/interfaces/repositories/ipayments-repository';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsRepositoryService implements IPaymentsRepository {

  constructor(
    private http: HttpClient
  ) { }

  getPayments(filters?: string): Observable<PaymentEntity[]> {
    return this.http.get<PaymentEntity[]>(`${environment.serverUrl}/payments?${filters}`);
  }

  createPayment(payment: PaymentEntity): Observable<PaymentEntity> {
    return this.http.post<PaymentEntity>(`${environment.serverUrl}/payments`, payment);
  }

  updatePayment(id: string, payment: PaymentEntity): Observable<PaymentEntity> {
    return this.http.put<PaymentEntity>(`${environment.serverUrl}/payments/${id}`, payment);
  }

  deletePayment(id: string): Observable<PaymentEntity> {
    return this.http.delete<PaymentEntity>(`${environment.serverUrl}/payments/${id}`);
  }
}
