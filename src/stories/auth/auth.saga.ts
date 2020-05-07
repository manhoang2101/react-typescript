import { put, takeEvery } from "redux-saga/effects";
import { BaseAction } from "../types";
import EAuthAction from "./auth.actions";
import ECommonAction from "../common/common.actions";
import { FetchAuthAction } from "./auth.types";

export function* submitLogin(action: FetchAuthAction) {
  yield put({
    type: ECommonAction.UPDATE_LOADING,
    payload: true,
  });
  const actonPut: BaseAction = {
    type: EAuthAction.LOGIN_SUBMIT_SUCCESS,
    payload: action.payload,
  };
  yield put(actonPut);
  action.payload.callBack && action.payload.callBack(action.payload.auth);
  yield put({
    type: ECommonAction.UPDATE_LOADING,
    payload: false,
  });
}

export default function* watchFetchAuthRequest() {
  yield takeEvery(EAuthAction.LOGIN_SUBMIT, submitLogin);
}
