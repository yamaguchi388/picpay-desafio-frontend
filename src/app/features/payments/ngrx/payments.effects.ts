import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs/operators";
import { PaymentsService } from "../payments.service";

import { paymentsActions } from "./payments.actions";

@Injectable()
export class PaymentsEffects {
  list$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentsActions.list),
      exhaustMap((payload) =>
        this.service.list({ ...payload.pagination, ...payload.query })
      ),
      map((response) =>
        paymentsActions.listWithSuccess({
          totalItens: response.totalItens,
          payments: response.itens,
        })
      )
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentsActions.save),
      exhaustMap((payload) => this.service.save(payload.payment)),
      map(() => paymentsActions.saveWithSuccess())
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentsActions.update),
      exhaustMap((payload) => this.service.update(payload.payment)),
      map(() => paymentsActions.saveWithSuccess())
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentsActions.delete),
      exhaustMap((payload) => this.service.delete(payload.payment)),
      map(() => paymentsActions.deleteWithSuccess())
    )
  );

  constructor(private actions$: Actions, private service: PaymentsService) {}
}
