import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { BaseAction } from '../types';
import { callApi, initOptionCallApi, IOptionCallApi } from '../../untils/api';
import { EUserAction } from './user.actions';

function* fetchUsers(_action: BaseAction) {
    const option: IOptionCallApi = {
        ...initOptionCallApi,
        path: 'assets/data/users.json'
    };
    const res = yield call(callApi, option);
    const actonPut: BaseAction = {
        type: EUserAction.FETCH_USERS_SUCCESS,
        payload: res.data
    }
    yield put(actonPut);
}

function* watchFetchRequest() {
    yield takeEvery(EUserAction.FETCH_USERS, fetchUsers)
}


function* usersSaga() {
    yield all([fork(watchFetchRequest)])
}

export default usersSaga