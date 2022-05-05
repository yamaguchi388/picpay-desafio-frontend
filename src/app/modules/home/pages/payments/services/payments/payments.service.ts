import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "src/app/shared/services/http/http.service";
import { IPayment } from "../../interfaces";

@Injectable({
  providedIn: "root",
})
export class PaymentsService {
  private readonly apiUrl = "tasks";

  constructor(private readonly httpService: HttpService) {}

  index(): Observable<IPayment[]> {
    return this.httpService.get<IPayment[]>(this.apiUrl);
  }

  store(payment: IPayment) {
    payment.isPayed = false;
    return this.httpService.post<IPayment>(this.apiUrl, payment);
  }
}
