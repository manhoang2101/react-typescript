import { createSelector } from "reselect";
import { IAppState } from "../types";
import { ICommonState } from "./common.types";

export const commonReducer = (state: IAppState) => state.commonReducer;

export const selectorLoading = createSelector(
  commonReducer,
  (state: ICommonState) => state.pageLoading
);

export const selectorConfig = createSelector(
  commonReducer,
  (state: ICommonState) => state.config
);
