import { createReducer, Action, on } from "@ngrx/store";
import { AppError } from "../../models/app-error.interface";
import * as ErrorActions from '../actions/error.actions'

export const initialState: AppError = {
    description: '',
    where: ''
};

const _errorReducer = createReducer(
    initialState,
    on(ErrorActions.Errors, 
        (state, { payload }) => {
            state = payload;
            console.log('ErrorState:Error:state', state);
            return state;
        }
    ),
    on(ErrorActions.Resolve, 
        (state) => {
            state = initialState;
            console.log('ErrorState:Resolve');
            return state;
        }
    ),
);

export function errorReducer(state: AppError | undefined, action: Action) {
    return _errorReducer(state, action);
}