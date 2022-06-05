import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Payment } from "@app/models/payment";
import { Pagination } from "@app/models/structure/pagination";
import { environment } from "@env/environment";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";
import { parseHttpResponse, parseJsonToPayments } from "./payments.config";

const BASE_URL = environment.baseURL;

@Injectable({
  providedIn: "root",
})
export class PaymentsService {
  constructor(private http: HttpClient) {}

  list(query: Record<any, any>) {
    const params = new HttpParams().appendAll(Object.assign({}, query as any));
    return this.http
      .get<Payment[]>(`${BASE_URL}/tasks`, {
        params,
        observe: "response",
      })
      .pipe(map(parseHttpResponse));
  }

  save(payment: Payment) {
    return this.http.post<Payment>(`${BASE_URL}/tasks`, payment);
  }

  update(payment: Payment) {
    return this.http.post<Payment>(`${BASE_URL}/tasks/${payment.id}`, payment);
  }
}
