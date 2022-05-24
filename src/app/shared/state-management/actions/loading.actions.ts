import { createAction, props } from '@ngrx/store';

export const Start = createAction(
    '[Loading] Start'
);

export const Stop = createAction(
    '[Loading] Stop'
);