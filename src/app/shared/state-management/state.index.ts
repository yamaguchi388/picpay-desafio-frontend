import { ActionReducerMap } from "@ngrx/store";
import { Account } from "../models/account.interface";
import { AppError } from "../models/app-error.interface";
import { Pagination } from "../models/pagination.interface";
import { Task } from "../models/task.interface";
import { TasksIndex } from "../models/tasks-index.interface";
import { errorReducer } from "./reducers/error.reducer";
import { paginationReducer } from "./reducers/pagination.reducer";
import { taskReducer } from "./reducers/task.reducer";
import { tasksReducer } from "./reducers/tasks.reducer";

interface AppState {
    tasks: TasksIndex;
    task: Task;
    error: AppError;
    pagination: Pagination;
}

export const reducers: ActionReducerMap<AppState> = {
    tasks: tasksReducer,
    task: taskReducer,
    error: errorReducer,
    pagination: paginationReducer,
}