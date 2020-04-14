import { CommonActionTypes, ICommonState } from "./common.types";
import ECommonAction from "./common.actions";
export const initialCommonState: ICommonState = {
  pageLoadding: false,
  config: {},
};
export function commonReducer(
  state = initialCommonState,
  action: CommonActionTypes
): ICommonState {
  switch (action.type) {
    case ECommonAction.UPDATE_LOADDING: {
      return {
        ...state,
        pageLoadding: action.payload,
      };
    }
    case ECommonAction.FETCH_CONFIG_SUCCESS: {
      return {
        ...state,
        config: action.payload,
      };
    }
    default:
      return state;
  }
}
