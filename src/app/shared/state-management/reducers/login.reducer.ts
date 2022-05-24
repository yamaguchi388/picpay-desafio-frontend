import { createReducer, Action, on } from "@ngrx/store";
import * as LoginActions from '../actions/login.actions'

export const initialState: boolean = false;

const _loginReducer = createReducer(
    initialState,
    on(LoginActions.Logged, 
        (state) => {
            state = true;
            console.log('LoginState:Logged:state', state);
            return state;
        }
    ),
    on(LoginActions.Unauthorized, 
        (state) => {
            state = initialState;
            console.log('LoginState:Unauthorized:state', state);
            return state;
        }
    ),
);

export function loginReducer(state: boolean | undefined, action: Action) {
    return _loginReducer(state, action);
}