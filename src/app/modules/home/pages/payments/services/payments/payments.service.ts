import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IHttpParams } from "src/app/shared/interfaces";
import { HttpService } from "src/app/shared/services/http/http.service";
import { IPaginator, IPayment } from "../../interfaces";

@Injectable({
  providedIn: "root",
})
export class PaymentsService {
  private readonly apiUrl = "tasks";

  constructor(private readonly httpService: HttpService) {}

  index(
    page = 1,
    limit = 10,
    filter?: string
  ): Observable<IPaginator<IPayment[]>> {
    const params: IHttpParams[] = [
      {
        key: "_page",
        value: String(page),
      },
      {
        key: "_limit",
        value: String(limit),
      },
    ];

    if (filter) {
      params.push({
        key: "username_like",
        value: filter,
      });
    }

    return this.httpService
      .getFullResponse<HttpResponse<IPayment[]>>(this.apiUrl, params)
      .pipe(
        map(({ headers, body }) => {
          return {
            page,
            limit,
            items: <any>body,
            total: Number(headers.get("X-Total-Count")),
          };
        })
      );
  }

  store(payment: IPayment) {
    payment.isPayed = false;
    return this.httpService.post<IPayment>(this.apiUrl, payment);
  }

  update(payment: IPayment) {
    return this.httpService.put<IPayment>(this.apiUrl, payment.id, payment);
  }

  delete(payment: IPayment) {
    return this.httpService.delete(this.apiUrl, payment.id);
  }
}