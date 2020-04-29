import { call, put, takeEvery } from "redux-saga/effects";
import { BaseAction } from "../types";
import { callApi, initOptionCallApi, IOptionCallApi } from "../../untils/api";
import EUserAction from "./user.actions";
import ECommonAction from "../common/common.actions";

export function* fetchUsers() {
  const option: IOptionCallApi = {
    ...initOptionCallApi,
    path: "assets/data/users.json",
  };
  yield put({
    type: ECommonAction.UPDATE_LOADING,
    payload: true,
  });
  const res = yield call(callApi, option);
  const actonPut: BaseAction = {
    type: EUserAction.FETCH_USERS_SUCCESS,
    payload: res.data,
  };
  yield put(actonPut);
  yield put({
    type: ECommonAction.UPDATE_LOADING,
    payload: false,
  });
}

export default function* watchFetchUserRequest() {
  yield takeEvery(EUserAction.FETCH_USERS, fetchUsers);
}
