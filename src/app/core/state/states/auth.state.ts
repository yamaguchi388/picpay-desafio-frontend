/* eslint-disable no-unused-vars */
import { Action, State, StateContext } from '@ngxs/store';
import { filter, map, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Accounts } from 'src/app/shared/types/account/accounts.type';
import { AuthService } from './../services/auth.service';
import { AuthStateModel } from '../models/auth-state.model';
import { Authenticate } from './../actions/auth-state.actions';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    actualAccount: null,
    isAuthenticated: false
  }
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Action(Authenticate)
  updatePayment(ctx: StateContext<AuthStateModel>, action: Authenticate) {
    const state = ctx.getState();
    return this.authService.authenticate(action.authentication).pipe(
      switchMap((accounts) => {
        return accounts.length > 0
          ? of(accounts)
          : throwError('Usuario ou senha inválidos');
      }),
      filter((accounts) => (accounts as Accounts)?.length === 1),
      map((accounts) => accounts[0]),
      tap((account) => {
        ctx.patchState({
          ...state,
          actualAccount: account,
          isAuthenticated: true
        });
      })
    );
  }
}
