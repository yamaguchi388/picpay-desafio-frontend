import { HttpResponse } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { Payment } from "@app/models/payment";
import { plainToClass } from "class-transformer";
import { paymentsActions } from "./ngrx/payments.actions";

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
    name: new FormControl(payment?.name || "", [Validators.required]),
    value: new FormControl(payment?.value || "", [Validators.required]),
    date: new FormControl(payment?.date || "", [Validators.required]),
    title: new FormControl(payment?.title || "", [Validators.required]),
    isPayed: new FormControl(payment?.isPayed || false),
  });

  !payment?.id && formGroup.controls["id"].disable();

  return formGroup;
}

export const searchablePaymentActions: string[] = [
  paymentsActions.saveWithSuccess.type,
  paymentsActions.updateWithSuccess.type,
  paymentsActions.deleteWithSuccess.type,
];

export function parseSort(sort: MatSort) {
  if (!sort || !sort.active) return {};
  return {
    _sort: sort.active,
    _order: sort.direction,
  };
}

export function formGroupForFilterInPaymentTable() {
  return new FormGroup({
    q: new FormControl(""),
    date_gte: new FormControl(""),
    date_lte: new FormControl(""),
    isPayed_like: new FormControl(""),
  });
}

export function parseFilters(itens: Record<any, any>) {
  const filters = Object.fromEntries(
    Object.entries(itens).filter(([_key, value]) => !!value)
  );

  filters["date_gte"] &&
    (filters["date_gte"] = (filters["date_gte"] as Date).toISOString());

  filters["date_lte"] &&
    (filters["date_lte"] = (filters["date_lte"] as Date).toISOString());

  return filters;
}

export const selectOptions = [
  {
    type: "TODOS",
    value: "",
  },
  {
    type: "PAGOS",
    value: "true",
  },
  {
    type: "NÃO PAGOS",
    value: "false",
  },
];

export const columnNames: string[] = [
  "name",
  "title",
  "date",
  "value",
  "isPayed",
  "actions",
];
