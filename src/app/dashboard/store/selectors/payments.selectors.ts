import { createSelector } from '@ngrx/store';
import * as fromReducers from '../reducers';

export const selectPayments = createSelector(
  fromReducers.getPaymentsState,
  (state) => state.dashboard
);

export const getPaymentsLoading = createSelector(
  selectPayments,
  (state) => state.loading
);
export const getPaymentsLoaded = createSelector(
  selectPayments,
  (state) => state.loaded
);
export const getPaymentsData = createSelector(
  selectPayments,
  (state) => state?.data
);

export const getPaymentsPage = createSelector(
  selectPayments,
  (state) => state?.page
);
