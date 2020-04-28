import { IUserState, UserActionTypes } from "./user.types";
import EUserAction from "./user.actions";
export const initialState: IUserState = {
  user: null,
  users: [],
};
export function userReducer(
  state = initialState,
  action: UserActionTypes
): IUserState {
  switch (action.type) {
    case EUserAction.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case EUserAction.SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case EUserAction.ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    default:
      return state;
  }
}
