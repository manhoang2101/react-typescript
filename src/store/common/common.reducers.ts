import { CommonActionTypes, ICommonState } from "./common.types";
import ECommonAction from "./common.actions";
export const initialCommonState: ICommonState = {
  pageLoading: false,
  config: {},
};
export function commonReducer(
  state = initialCommonState,
  action: CommonActionTypes
): ICommonState {
  switch (action.type) {
    case ECommonAction.UPDATE_LOADING: {
      return {
        ...state,
        pageLoading: action.payload,
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
