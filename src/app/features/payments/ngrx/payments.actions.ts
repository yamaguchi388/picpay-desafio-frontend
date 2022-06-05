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

const save = createAction("[PAYMENTS] Save", props<{ payment: Payment }>());

const saveWithSuccess = createAction("[PAYMENTS] Save With Success");

const update = createAction(
  "[PAYMENTS] Update",
  props<{ pagination: Pagination; query: Record<string, string> }>()
);

const updateWithSuccess = createAction(
  "[PAYMENTS] Update With Success",
  props<{ totalItens: number; payments: Payment[] }>()
);

export const paymentsActions = {
  list,
  listWithSuccess,
  save,
  saveWithSuccess,
  update,
  updateWithSuccess,
};
