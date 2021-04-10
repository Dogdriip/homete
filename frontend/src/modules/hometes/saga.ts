import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH,
  fetchAsync,
  SEND,
  sendAsync,
  APPROVE,
  approveAsync,
  REJECT,
  rejectAsync,
} from "./actions";
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

function* approveSaga(
  action: ReturnType<typeof approveAsync.request>,
): Generator {
  try {
    // homete 승인 시도
    yield call(api.approveHomete, action.payload);
    // homete 승인 성공
    toast({
      title: "승인 완료!",
      type: "success",
      description: "칭찬이 승인되었습니다.",
      time: 3000,
      animation: "fade left",
    });
    yield put(approveAsync.success(action.payload));
  } catch (e) {
    // homete 승인 에러
    yield put(approveAsync.failure(e));
  }
}

function* rejectSaga(
  action: ReturnType<typeof approveAsync.request>,
): Generator {
  try {
    // homete 삭제 시도
    yield call(api.deleteHomete, action.payload);
    // homete 삭제 성공
    toast({
      title: "삭제 완료!",
      type: "warning",
      description: "칭찬이 삭제되었습니다.",
      time: 3000,
      animation: "fade left",
    });
    yield put(rejectAsync.success(action.payload));
  } catch (e) {
    // homete 삭제 에러
    yield put(rejectAsync.failure(e));
  }
}

export function* hometesSaga() {
  yield takeLatest(FETCH, fetchSaga);
  yield takeLatest(SEND, sendSaga);
  yield takeLatest(APPROVE, approveSaga);
  yield takeLatest(REJECT, rejectSaga);
}
