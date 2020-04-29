import { IUserState } from "./user.types";
import { createSelector } from "reselect";

export const userReducer = (state: IUserState) => state;

export const selectorUser = createSelector(
  userReducer,
  (state: IUserState) => state.user
);

export const selectorUsers = createSelector(
  userReducer,
  (state: IUserState) => state.users
);
