import { ActionReducerMap } from "@ngrx/store";
import { TasksIndex } from "../models/tasks-index.interface";
import { tasksReducer } from "./reducers/tasks.reducer";

interface AppState {
    tasks: TasksIndex
}

export const reducers: ActionReducerMap<AppState> = {
    tasks: tasksReducer
}