import { ActionReducerMap } from "@ngrx/store";
import { AppError } from "../models/app-error.interface";
import { Task } from "../models/task.interface";
import { TasksIndex } from "../models/tasks-index.interface";
import { errorReducer } from "./reducers/error.reducer";
import { taskReducer } from "./reducers/task.reducer";
import { tasksReducer } from "./reducers/tasks.reducer";

interface AppState {
    tasks: TasksIndex;
    task: Task;
    error: AppError;
}

export const reducers: ActionReducerMap<AppState> = {
    tasks: tasksReducer,
    task: taskReducer,
    error: errorReducer
}