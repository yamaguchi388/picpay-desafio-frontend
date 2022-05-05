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

  index(page = 1, limit = 10): Observable<IPaginator<IPayment[]>> {
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
}
