import { createSelector } from "reselect";
import { IAppState } from "../types";
import { ICommonState } from "./common.types";

export const commonReducer = (state: IAppState) => state.commonReducer;

export const selectorLoaddding = createSelector(
  commonReducer,
  (state: ICommonState) => state.pageLoadding
);

export const selectorCongifg = createSelector(
  commonReducer,
  (state: ICommonState) => state.config
);
