import { createAction, props } from "@ngrx/store";
import { Account } from "../../models/account.interface";

export const LoginAccount = createAction(
    '[Account] Login account',
    props<{ account: Account }>()
);

export const LogoutAccount = createAction(
    '[Account] Logout account',
);