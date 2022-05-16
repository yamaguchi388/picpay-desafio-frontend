import { HttpService } from "@/app/core/infra/http.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@/environments/environment";
import { SearchOptions } from "@/app/core/models/search-options.model";
import { Payment } from "../models/payment.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { PaymentResponse } from "../models/payment-response.model";

@Injectable()
export class PaymentService {
  tasksUrl = "tasks";
  constructor(private httpService: HttpService, private http: HttpClient) {}

  public getPayments(searchOptions: SearchOptions): Observable<PaymentResponse> {
    
    return this.http
      .get(`${environment.baseUrl}/${this.tasksUrl}${searchOptions.getQuery()}`, {
        observe: "response",
      })
      .pipe(
        map((response) => {
          const link = response.headers.get("Link");
          const totaPages = this.getTotalPagesFromHeaderLink(link);
          const payments = response.body as Array<Payment>;
          return new PaymentResponse(totaPages, payments);
        })
      );
  }

  public createPayment(payment: Payment) {
    return this.httpService.post(this.tasksUrl, payment);
  }

  public editPayment(payment: Payment) {
    return this.httpService.put(`${this.tasksUrl}/${payment.id}`, payment);
  }

  public deletePayment(id: number) {
    return this.httpService.delete(`${this.tasksUrl}/${id}`);
  }

  public getTotalPagesFromHeaderLink(linkHeader: string) {
    const linkHeadersArray = linkHeader
      .split(", ")
      .map((header) => header.split("; "));
    
    const linkHeadersMap = linkHeadersArray.map((header) => {
      const thisHeaderUrl = header[0].slice(1, -1);
      return thisHeaderUrl;
    });

    const lastItem = linkHeadersMap.pop();

    let query = lastItem.replace(`${environment.baseUrl}/${this.tasksUrl}?_page=`, "");
    const total = query.substring(0, query.indexOf("&"));
    
    return Number.parseInt(total);
  }
}
