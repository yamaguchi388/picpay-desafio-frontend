import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpUrlEncodingCodec,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { IFilters } from "src/app/interfaces/IFilters";
import { ICreatePayment, IPayment } from "src/app/interfaces/IPayment";

@Injectable()
export class PaymentsService {
  constructor(private http: HttpClient) {}

  private baseUrl = "http://localhost:3000";

  appendFilters(filters?: IFilters) {
    let params = new HttpParams({ encoder: new HttpUrlEncodingCodec() });
    params = params.append("_page", String(filters?.page));
    params = params.append("_limit", String(filters?.limit));
    params = params.append("_sort", String(filters?.sortField));
    params = params.append("_order", String(filters?.sortOrder));

    params = params.append("username_like", String(filters?.username || ``));
    params = params.append("name_like", String(filters?.name || ``));
    params = params.append("title_like", String(filters?.title || ``));
    params = params.append("date_like", String(filters?.date || ``));
    params = params.append("isPayed_like", String(filters?.isPayed || ``));

    params = params.append("value_like", String(filters?.value || ``));
    params = params.append("Access-Control-Expose-Headers", "X-Total-Count");

    return params;
  }

  getPayments(filters?: IFilters): Observable<any> {
    const params = this.appendFilters(filters);

    return this.http.get(`${this.baseUrl}/payments`, {
      responseType: "json",
      observe: "response",
      params,
    });
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/payments/${id}`);
  }

  includePayment(payment: ICreatePayment): Observable<IPayment> {
    return this.http.post<IPayment>(`${this.baseUrl}/payments`, payment);
  }

  editPayment(payment: IPayment): Observable<IPayment> {
    const { id } = payment;
    delete payment.id;

    return this.http.put<IPayment>(`${this.baseUrl}/payments/${id}`, payment);
  }
}
