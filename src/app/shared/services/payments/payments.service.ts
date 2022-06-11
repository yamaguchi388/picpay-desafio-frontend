import { PaymentModel } from './../../models/payment.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpClient
  ) { }

  public getPayments(
    page: number, limit: string, user?: string
  ): Observable<HttpResponse<Array<PaymentModel>>> {

    let params;

    if(user) {
      
      params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit)
      .set('username', user)

    } else {
      params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit)
    }

    return this.http.get<Array<PaymentModel>>(environment.payments_url,
      {
        params,
        observe: "response",
      }
    );
  }

  public createPayments(payment: PaymentModel): Observable<PaymentModel> {
    return this.http.post<PaymentModel>(
      environment.payments_url,
      { ...payment }
    );
  }

  public deletePayments(id: number): Observable<PaymentModel> {
    return this.http.delete<PaymentModel>(
      `${environment.payments_url}/${id}`
    );
  }

  public editPayments(payment: PaymentModel): Observable<PaymentModel> {
    return this.http.put<PaymentModel>(
      `${environment.payments_url}/${payment.id}`,
      { ...payment }
    );
  }
}
