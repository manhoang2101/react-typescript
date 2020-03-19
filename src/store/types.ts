import { IUserState } from "./user/user.types";

export interface IAppState {
    userReducer: IUserState,
    router: any
}

export interface BaseAction {
    type: string
    payload: any | null
}
