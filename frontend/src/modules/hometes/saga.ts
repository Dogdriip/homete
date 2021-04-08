import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH, fetchAsync, SEND, sendAsync } from "./actions";
import { toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import * as api from "../../lib/api";
import { Homete } from "../../types/Homete";

function* fetchSaga(action: ReturnType<typeof fetchAsync.request>): Generator {
  try {
    // hometes 가져오기 시도
    const hometes = yield call(api.getHometes, action.payload);
    // hometes 가져오기 성공
    yield put(fetchAsync.success(hometes as Homete[]));
  } catch (e) {
    // hometes 가져오기 에러
    yield put(fetchAsync.failure(e));
  }
}

function* sendSaga(action: ReturnType<typeof sendAsync.request>): Generator {
  try {
    // hometes 전송 시도
    yield call(api.setHomete, action.payload);
    // hometes 전송 성공
    toast({
      title: "칭찬 완료!",
      type: "success",
      description: "칭찬을 남겼어요.",
      time: 3000,
      animation: "fade left",
    });
    yield put(sendAsync.success());
  } catch (e) {
    // hometes 전송 에러
    yield put(sendAsync.failure(e));
  }
}

export function* hometesSaga() {
  yield takeLatest(FETCH, fetchSaga);
  yield takeLatest(SEND, sendSaga);
}
