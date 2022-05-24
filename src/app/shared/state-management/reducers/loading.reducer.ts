import { createReducer, Action, on } from "@ngrx/store";
import * as LoadingActions from '../actions/loading.actions'

export const initialState: boolean = false;

const _loadingReducer = createReducer(
    initialState,
    on(LoadingActions.Start, 
        (state) => {
            state = true;
            console.log('LodingState:Start:state', state);
            return state;
        }
    ),
    on(LoadingActions.Stop, 
        (state) => {
            state = initialState;
            console.log('LodingState:Stop:state', state);
            return state;
        }
    ),
);

export function loadingReducer(state: boolean | undefined, action: Action) {
    return _loadingReducer(state, action);
}