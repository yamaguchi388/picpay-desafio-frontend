import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/services/http/http.service";
import { IPayment } from "../../interfaces";

@Injectable({
  providedIn: "root",
})
export class PaymentsService {
  private readonly apiUrl = "tasks";

  constructor(private readonly httpService: HttpService) {}

  store(payment: IPayment) {
    return this.httpService.post<IPayment>(this.apiUrl, payment);
  }
}
