import { ActionReducerMap } from "@ngrx/store";
import { Task } from "../models/task.interface";
import { TasksIndex } from "../models/tasks-index.interface";
import { taskReducer } from "./reducers/task.reducer";
import { tasksReducer } from "./reducers/tasks.reducer";

interface AppState {
    tasks: TasksIndex;
    task: Task
}

export const reducers: ActionReducerMap<AppState> = {
    tasks: tasksReducer,
    task: taskReducer
}