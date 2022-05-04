import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentModel } from '../../models/payment.model';
import { environment } from 'src/environments/environment';
import { LiteralPrimitive } from '@angular/compiler';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpClient
  ) { }

  public getPayments(page: number, limit: string, user?: string): Observable<HttpResponse<Array<PaymentModel>>> {

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
}
