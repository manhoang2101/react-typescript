import { IUserState } from "./user.types";
import { createSelector } from 'reselect'
import { IAppState } from "../types";


export const selectorUser = createSelector(
    (state: IAppState) => state.userReducer,
    (userReducer: IUserState) => userReducer.user
)

export const selectorUsers = createSelector(
    (state: IAppState) => state.userReducer,
    (userReducer: IUserState) => userReducer.users
)
