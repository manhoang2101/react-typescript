import EUserAction from "./user.actions";
import { BaseAction } from "../types";

export interface IUser {
  name: string;
  id: string | number;
  cardNumber?: string;
  cardType?: string;
}
export interface IUserState {
  users: IUser[];
  user?: IUser | null;
}

export interface fetchUsersAction extends BaseAction {
  type: typeof EUserAction.FETCH_USERS;
}
export interface fetchUsersSuccessAction extends BaseAction {
  type: typeof EUserAction.FETCH_USERS_SUCCESS;
  payload: IUser[];
}

export type UserActionTypes =
  | fetchUsersAction
  | fetchUsersSuccessAction
  | BaseAction;
