import { HttpResponse } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  return newResponse;
}

export function paymentFormGroup(payment?: Payment) {
  const formGroup = new FormGroup({
    id: new FormControl(payment?.id || 0),
    name: new FormControl(payment?.username || "", [Validators.required]),
    value: new FormControl(payment?.value || "", [Validators.required]),
    date: new FormControl(payment?.date || "", [Validators.required]),
    title: new FormControl(payment?.title || "", [Validators.required]),
    isPayed: new FormControl(payment?.isPayed || false),
  });

  !payment?.id && formGroup.controls['id'].disable();

  return formGroup;
}
