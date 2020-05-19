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

export interface FetchUsersAction extends BaseAction {
  type: typeof EUserAction.FETCH_USERS;
}
export interface FetchUsersSuccessAction extends BaseAction {
  type: typeof EUserAction.FETCH_USERS_SUCCESS;
  payload: IUser[];
}

export interface SetUser extends BaseAction {
  type: typeof EUserAction.SET_USER;
  payload: IUser;
}
export interface AddUser extends BaseAction {
  type: typeof EUserAction.ADD_USER;
  payload: IUser;
}
export interface DeleteUser extends BaseAction {
  type: typeof EUserAction.DELETE_USER;
  payload: number;
}
export interface UpdateUser extends BaseAction {
  type: typeof EUserAction.UPDATE_USER;
  payload: IUser;
}
export type UserActionTypes =
  | SetUser
  | AddUser
  | DeleteUser
  | UpdateUser
  | FetchUsersAction
  | FetchUsersSuccessAction
  
