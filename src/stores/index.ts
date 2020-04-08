import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducers";
import usersSaga from "./user/user.saga";
import { all, fork } from "redux-saga/effects";
import { connectRouter } from "connected-react-router";
import { History } from "history";

export const createRootReducer = (history: History) =>
  combineReducers({
    userReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(usersSaga)]);
}
