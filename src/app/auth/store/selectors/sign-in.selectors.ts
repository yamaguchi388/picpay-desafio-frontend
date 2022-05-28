import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';

export const selectSignIn = createSelector(
  fromReducers.getSignInState,
  (state) => state.signIn
);

export const getSignInLoading = createSelector(
  selectSignIn,
  (state) => state.loading
);

export const getLoggedInUser = createSelector(
  selectSignIn,
  (state) => state.user
);
