import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Payment } from 'src/app/shared/models/payment';

export enum TasksActionTypes {
  LOAD_TASKS = '[Dashboard] Load Tasks',
  LOAD_TASKS_SUCCESS = '[Dashboard] Load Tasks Success',
  LOAD_TASKS_FAILURE = '[Dashboard] Load Tasks Failure',
}

export const loadTasks = createAction(TasksActionTypes.LOAD_TASKS);

export const loadTasksSuccess = createAction(
  TasksActionTypes.LOAD_TASKS_SUCCESS,
  props<{ payload: Payment[] }>()
);
