import { createAction, props } from "@ngrx/store";
import { Task } from "../../models/task.interface";

export const AddTask = createAction(
    '[Task] Add task',
    props<{ task: Task }>()
);

export const CreateTask = createAction(
    '[Task] Create task',
    props<{ task: Task }>()
);

export const CreateTaskSuccess = createAction(
    '[Task] Create task success',
    props<{ task: Task }>()
);

export const UpdateTask = createAction(
    '[Task] Update task',
    props<{ task: Task }>()
);

export const UpdateTaskSuccess = createAction(
    '[Task] Update task success',
    props<{ task: Task }>()
);

export const DeleteTask = createAction(
    '[Task] Delete task',
    props<{ id: number }>()
);

export const DeleteTaskSuccess = createAction(
    '[Task] Delete task success',
);

export const ClearTask = createAction(
    '[Task] Clear task'
);