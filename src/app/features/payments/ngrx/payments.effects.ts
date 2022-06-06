import { Injectable } from "@angular/core";
import { SnackbarService } from "@app/core/services/snackbar.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { PaymentsService } from "../payments.service";

import { paymentsActions } from "./payments.actions";

@Injectable()
export class PaymentsEffects {
  list$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentsActions.list),
      exhaustMap((payload) =>
        this.service.list({ ...payload.pagination, ...payload.query }).pipe(
          map((response) =>
            paymentsActions.listWithSuccess({
              totalItens: response.totalItens,
              payments: response.itens,
            })
          ),
          catchError(() => {
            this.snack.error("Problema ao listar");
            return EMPTY;
          })
        )
      )
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentsActions.save),
      exhaustMap((payload) =>
        this.service.save(payload.payment).pipe(
          map(() => {
            this.snack.success("Pagamento Registrado");
            return paymentsActions.saveWithSuccess();
          }),
          catchError(() => {
            this.snack.error("Problema ao salvar pagamento");
            return EMPTY;
          })
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentsActions.update),
      exhaustMap((payload) => {
        this.snack.success("Pagamento Atualizado");
        return this.service.update(payload.payment).pipe(
          map(() => paymentsActions.saveWithSuccess()),
          catchError(() => {
            this.snack.error("Problema ao atualizar pagamento");
            return EMPTY;
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentsActions.delete),
      exhaustMap((payload) => {
        this.snack.success("Pagamento Excluído");
        return this.service.delete(payload.payment).pipe(
          map(() => paymentsActions.deleteWithSuccess()),
          catchError(() => {
            this.snack.error("Problema ao excluir pagamento");
            return EMPTY;
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private service: PaymentsService,
    private snack: SnackbarService
  ) {}
}
