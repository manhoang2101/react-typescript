import EAuthAction from "./auth.actions";
import { BaseAction } from "../types";

export interface IAuth {
  name: string;
  email: string;
  token: string;
}
export interface IAuthState {
  auth?: IAuth | null;
}

export interface FetchAuthAction extends BaseAction {
  type: typeof EAuthAction.LOGIN_SUBMIT;
  payload: {
    auth: IAuth;
    callBack?: (data: Object) => void;
  };
}
export interface FetchAuthSuccessAction extends BaseAction {
  type: typeof EAuthAction.LOGIN_SUBMIT_SUCCESS;
  payload: IAuth;
}

export type AuthActionTypes = FetchAuthAction | FetchAuthSuccessAction;
