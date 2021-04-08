import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH,
  fetchAsync,
  FETCH_CONTRIBUTOR,
  fetchContributorAsync,
} from "./actions";
import { User } from "../../types/User";
import * as api from "../../lib/api";

function* fetchSaga(action: ReturnType<typeof fetchAsync.request>): Generator {
  try {
    // user 정보 가져오기 시도
    const user = yield call(api.getUserByScreenName, action.payload);
    // user 정보 가져오기 성공
    yield put(fetchAsync.success(user as User));
  } catch (e) {
    // user 정보 가져오기 에러
    yield put(fetchAsync.failure(e));
  }
}

function* fetchContributorSaga(
  action: ReturnType<typeof fetchAsync.request>,
): Generator {
  try {
    // contributor 정보 가져오기 시도
    const description = yield call(
      api.getContributorByScreenName,
      action.payload,
    );
    // contributor 정보 가져오기 성공
    yield put(fetchContributorAsync.success(description as string));
  } catch (e) {
    // contributor 정보 가져오기 에러
    yield put(fetchContributorAsync.failure(e));
  }
}

export function* userSaga() {
  yield takeLatest(FETCH, fetchSaga);
  yield takeLatest(FETCH_CONTRIBUTOR, fetchContributorSaga);
}
