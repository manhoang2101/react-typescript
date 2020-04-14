import { IUserState } from "./user/user.types";
import { ICommonState } from "./common/common.types";
export interface IAppState {
  userReducer: IUserState;
  router: any;
  commonReducer: ICommonState;
}

export interface BaseAction {
  type: string;
  payload: any | null;
}
