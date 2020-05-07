import { IAuthState } from "./auth.types";
import { createSelector } from "reselect";

export const authReducer = (state: IAuthState) => state;

export const selectorAuth = createSelector(
  authReducer,
  (state: IAuthState) => state.auth
);
