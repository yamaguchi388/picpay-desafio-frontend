import { createReducer, Action, on } from "@ngrx/store";
import { Account } from "../../models/account.interface";
import * as AccountActions from '../actions/account.actions'

export const initialState: Account = {
    email: '',
    id: 0,
    name: '',
    password: ''
};

const _accountReducer = createReducer(
    initialState,
    on(AccountActions.LoginAccount, 
        (state, { account }) => {
            state = account;
            console.log('AccountState:LoginAccount:state', state);
            return state;
        }
    ),
    on(AccountActions.LogoutAccount, 
        (state) => {
            state = initialState;
            console.log('AccountState:LogoutAccount:state', state);
            return state;
        }
    )
);

export function accountReducer(state: Account | undefined, action: Action) {
    return _accountReducer(state, action);
}