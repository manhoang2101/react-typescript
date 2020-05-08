import { IAuthState, AuthActionTypes } from "./auth.types";
import EAuthAction from "./auth.actions";
export const initialState: IAuthState = {
  auth: null,
};
export function authReducer(
  state = initialState,
  action: AuthActionTypes
): IAuthState {
  switch (action.type) {
    case EAuthAction.LOGIN_SUBMIT_SUCCESS: {
      return {
        ...state,
        auth: action.payload,
      };
    }
    default:
      return state;
  }
}
