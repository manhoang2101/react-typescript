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
      const users = action.payload;
      return {
        ...state,
        user: users,
      };
    }
    case EUserAction.ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    case EUserAction.DELETE_USER: {
      const users = state.users.filter((index, key) => key !== action.payload);
      return {
        ...state,
        users: users,
      };
    }
    case EUserAction.UPDATE_USER: {
      const users = state.users.map((user) => {
          if(user.id === action.payload.id){
            return {
              ...user,
              ...action.payload
            }
          }
          return  user;
        }
      )    
      return {
        ...state,
        users: users,
      };
    }
    default:
      return state;
  }
}
