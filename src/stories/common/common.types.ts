import { BaseAction } from "../types";
import ECommonAction from "./common.actions";

export interface ICommonState {
  pageLoading: boolean;
  config: IConfig;
}
export interface IConfig {
  API?: string;
  PORT?: string;
}
export interface UpdateLoading extends BaseAction {
  type: typeof ECommonAction.UPDATE_LOADING;
  payload: boolean;
}
export interface FetchConfigSuccess extends BaseAction {
  type: typeof ECommonAction.FETCH_CONFIG_SUCCESS;
  payload: IConfig;
}

export type CommonActionTypes = UpdateLoading | FetchConfigSuccess;
