import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.interface';

export const AddTasks = createAction(
    '[Tasks] Add tasks',
    props<{ payload: Task[], total: number }>()
);

export const AddTask = createAction(
    '[Tasks] Add task',
    props<{ payload: Task }>()
);

export const RemoveTask = createAction(
    '[Tasks] Remove task',
    props<{ payload: number }>()
);

export const ClearTasks = createAction(
    '[Tasks] Clear tasks',
);

export const LoadTasks = createAction(
    '[Tasks] Load tasks',
    props<{ page: number, limit: number, username?: string }>()
);