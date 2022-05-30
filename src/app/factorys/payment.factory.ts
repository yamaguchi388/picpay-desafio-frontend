import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { IPayment } from "../interfaces/IPayment";
import { DateHelper } from "../services/date-helper/date.helper";

@Injectable()
export class PaymentFactory {
  constructor(private dateHelper: DateHelper) {}

  create() {
    return {
      name: new FormControl(""),
      username: new FormControl(""),
      title: new FormControl(""),
      value: new FormControl(),
      isPayed: new FormControl(true),
      date: new FormControl(),
    };
  }

  edit(payment: IPayment) {
    return {
      id: new FormControl(payment.id),
      name: new FormControl(payment.name),
      username: new FormControl(payment.username),
      title: new FormControl(payment.title),
      value: new FormControl(payment.value),
      isPayed: new FormControl(payment.isPayed),
      date: new FormControl(this.dateHelper.convertISO(payment.date)),
    };
  }
}
