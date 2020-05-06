import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducers";
import { all, fork } from "redux-saga/effects";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { commonReducer } from "./common/common.reducers";
import watchFetchUserRequest from "./user/user.saga";
import watchFetchCommonRequest from "./common/common.saga";

export const createRootReducer = (history: History) =>
  combineReducers({
    userReducer,
    router: connectRouter(history),
    commonReducer: commonReducer,
  });

export function* rootSaga() {
  yield all([fork(watchFetchUserRequest), fork(watchFetchCommonRequest)]);
}
