import { Action, createReducer, on } from "@ngrx/store";
import { PAGINATION_EMPTY } from "../../constants/pagination-empty.constants";
import { Pagination } from "../../models/pagination.interface";
import * as PaginationActions from '../actions/pagination.actions'

export const initialState: Pagination = PAGINATION_EMPTY;

const _paginationReducer = createReducer(
    initialState,
    on(PaginationActions.NextPage, 
        (state, { limit }) => {
            const pagination: Pagination = {
                total: state.total,
                limit: limit,
                page: state.page + 1
            };

            state = pagination;
            console.log('PaginationState:NextPage:state', state);
            return state;
        }
    ),
    on(PaginationActions.PreviousPage, 
        (state, { limit }) => {
            if (state.page > 1) {
                const pagination: Pagination = {
                    total: state.total,
                    limit: limit,
                    page: state.page - 1
                };

                state = pagination;
                console.log('PaginationState:PreviousPage:state', state);
            }
            return state;
        }
    ),
    on(PaginationActions.SetTotal, 
        (state, { total }) => {
            if (state.page > 1) {
                const pagination: Pagination = {
                    total,
                    limit: state.limit,
                    page: state.page - 1
                };

                state = pagination;
                console.log('PaginationState:SetTotal:state', state);
            }
            return state;
        }
    ),
    on(PaginationActions.GoToPage, 
        (state, { page, limit }) => {
            if (state.page >= 1) {
                const pagination: Pagination = {
                    total: state.total,
                    limit,
                    page
                };

                state = pagination;
                console.log('PaginationState:GoToPage:state', state);
            }
            return state;
        }
    ),
    on(PaginationActions.Clear, 
        (state) => {
            state = initialState;
            console.log('PaginationState:Clear');
            return state;
        }
    )
);

export function paginationReducer(state: Pagination | undefined, action: Action) {
    return _paginationReducer(state, action);
}