import { createReducer, Action, on } from "@ngrx/store";
import { TASK_EMPTY } from "../../constants/task-empty.constant";
import { Task } from "../../models/task.interface";
import * as TaskActions from '../actions/task.actions'

export const initialState: Task = TASK_EMPTY;

const _taskReducer = createReducer(
    initialState,
    on(TaskActions.AddTask, 
        (state, { task }) => {
            state = task;
            console.log('TasksState:AddTask:state', state);
            return state;
        }
    ),
    on(TaskActions.CreateTaskSuccess, 
        (state, { task }) => {
            state = task;
            console.log('TasksState:CreateTaskSuccess:state', state);
            return state;
        }
    ),
    on(TaskActions.UpdateTaskSuccess, 
        (state, { task }) => {
            state = task;
            console.log('TasksState:UpdateTaskSuccess:state', state);
            return state;
        }
    ),
    on(TaskActions.DeleteTaskSuccess, 
        (state) => {
            console.log('TasksState:DeleteTaskSuccess:state', state);
            return state;
        }
    ),
    on(TaskActions.ClearTask, 
        (state) => {
            state = initialState;
            console.log('TasksState:ClearTasks');
            return state;
        }
    ),
);

export function taskReducer(state: Task | undefined, action: Action) {
    return _taskReducer(state, action);
}