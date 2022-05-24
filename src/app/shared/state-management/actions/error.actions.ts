import { createAction, props } from '@ngrx/store';
import { AppError } from '../../models/app-error.interface';

export const Errors = createAction(
    '[Error] An error has occurred',
    props<{ payload: AppError }>()
);

export const Resolve = createAction(
    '[Error] The error has been resolved'
);