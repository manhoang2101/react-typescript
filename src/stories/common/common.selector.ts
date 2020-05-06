import { createSelector } from "reselect";
import { ICommonState } from "./common.types";

export const commonReducer = (state: ICommonState) => state;

export const selectorLoading = createSelector(
  commonReducer,
  (state: ICommonState) => state.pageLoading
);

export const selectorConfig = createSelector(
  commonReducer,
  (state: ICommonState) => state.config
);
