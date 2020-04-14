import { BaseAction } from "../types";
import ECommonAction from "./common.actions";

export interface ICommonState {
  pageLoadding: boolean;
  config: IConfig;
}
export interface IConfig {
  API?: string;
  PORT?: string;
}
export interface UpdateLoadding extends BaseAction {
  type: typeof ECommonAction.UPDATE_LOADDING;
  payload: boolean;
}
export interface fetchConfigSuccess extends BaseAction {
  type: typeof ECommonAction.FETCH_CONFIG_SUCCESS;
  payload: IConfig;
}
export type CommonActionTypes = UpdateLoadding | fetchConfigSuccess;
