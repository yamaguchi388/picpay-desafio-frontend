import { createReducer, Action, on } from "@ngrx/store";
import { TasksIndex } from "../../models/tasks-index.interface";
import * as TasksActions from '../actions/tasks.actions'

export const initialState: TasksIndex = {
    total: 0,
    tasks: []
};

const _tasksReducer = createReducer(
    initialState,
    on(TasksActions.AddTask, 
        (state, { payload }) => {
            state.tasks.push(payload);
            console.log('TasksState:AddTask:state', state);
            return state;
        }
    ),
    on(TasksActions.AddTasks, 
        (state, { payload, total }) => {
            if(payload.length > 0) {
                const index: TasksIndex = {
                    tasks: payload,
                    total
                }

                state = index;
                console.log('TasksState:AddTasks:state', state);
            }

            return state;
        }
    ),
    on(TasksActions.ClearTasks, 
        (state) => {
            state = initialState;
            console.log('TasksState:ClearTasks');
            return state;
        }
    ),
);

export function tasksReducer(state: TasksIndex | undefined, action: Action) {
    return _tasksReducer(state, action);
}