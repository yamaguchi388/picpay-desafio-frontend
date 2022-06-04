import { HttpResponse } from "@angular/common/http";
import { Payment } from "@app/models/payment";
import { plainToClass } from "class-transformer";

export function parseJsonToPayments(payments: any[]) {
  return payments.map((payment) =>
    plainToClass(Payment, { ...payment, date: new Date(payment.date) })
  );
}

export function parseHttpResponse(res: HttpResponse<Payment[]>) {
  const newResponse = {
    totalItens: Number(res.headers.get("X-Total-Count")),
    itens: parseJsonToPayments(res.body),
  };
  console.log(newResponse);
  return newResponse;
}
