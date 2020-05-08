import { call, put, takeEvery } from "redux-saga/effects";
import { BaseAction } from "../types";
import { callApi, initOptionCallApi, IOptionCallApi } from "../../untils/api";
import ECommonAction from "./common.actions";
import { OpenNotification } from "./common.types";

export function* fetchConfig() {
  const option: IOptionCallApi = {
    ...initOptionCallApi,
    path: "assets/data/config.json",
  };
  yield put({
    type: ECommonAction.UPDATE_LOADING,
    payload: true,
  });
  const res = yield call(callApi, option);
  const actonPut: BaseAction = {
    type: ECommonAction.FETCH_CONFIG_SUCCESS,
    payload: res.data,
  };
  yield put(actonPut);
  yield put({
    type: ECommonAction.UPDATE_LOADING,
    payload: false,
  });
}
export function openNotification(action: OpenNotification) {
  action.payload();
}
export default function* watchFetchCommonRequest() {
  yield takeEvery(ECommonAction.FETCH_CONFIG, fetchConfig);
  yield takeEvery(ECommonAction.OPEN_NOTIFICATION, openNotification);
}
