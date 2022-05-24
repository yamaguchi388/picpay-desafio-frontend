import { createAction, props } from '@ngrx/store';

export const NextPage = createAction(
    '[Pagination] Next page',
    props<{ limit: number }>()
);

export const PreviousPage = createAction(
    '[Pagination] Previous page',
    props<{ limit: number }>()
);

export const GoToPage = createAction(
    '[Pagination] Go to page',
    props<{ page: number, limit: number }>()
);

export const SetTotal = createAction(
    '[Pagination] Set total',
    props<{ total: number }>()
);

export const Clear = createAction(
    '[Pagination] Clear pagination'
);