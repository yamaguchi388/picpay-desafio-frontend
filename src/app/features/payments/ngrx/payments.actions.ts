import { Payment } from "@app/models/payment";
import { Pagination } from "@app/models/structure/pagination";
import { createAction, props } from "@ngrx/store";

const list = createAction(
  "[PAYMENTS] List",
  props<{ pagination: Pagination; query: Record<string, string> }>()
);

const listWithSuccess = createAction(
  "[PAYMENTS] List With Success",
  props<{ totalItens: number; payments: Payment[] }>()
);

export const paymentsActions = {
  list,
  listWithSuccess,
};
