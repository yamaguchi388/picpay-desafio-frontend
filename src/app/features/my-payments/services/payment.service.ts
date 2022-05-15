import { HttpService } from "@/app/core/infra/http.service";
import { SearchOptions } from "@/app/core/models/search-options.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Payment } from "../models/payment.model";

@Injectable()
export class PaymentService {
  tasksUrl = "tasks";
  constructor(private httpService: HttpService) {}

  public getPayments(searchOptions: SearchOptions): Observable<Payment[]> {
    return this.httpService.get<Payment[]>(
      `${this.tasksUrl}${searchOptions.getQuery()}`
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
}
