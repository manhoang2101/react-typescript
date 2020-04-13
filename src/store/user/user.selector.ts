import { IUserState } from "./user.types";
import { createSelector } from "reselect";
import { IAppState } from "../types";

export const userReducer = (state: IAppState) => state.userReducer;

export const selectorUser = createSelector(
  userReducer,
  (state: IUserState) => state.user
);

export const selectorUsers = createSelector(
  userReducer,
  (state: IUserState) => state.users
);
