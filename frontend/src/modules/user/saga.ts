import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH, fetchAsync } from "./actions";
import firebase from "firebase/app";
import "firebase/firestore";
import { User } from "../../types/User";

function* fetchSaga(action: ReturnType<typeof fetchAsync.request>): Generator {
  try {
    // user 정보 가져오기 시도
    const db = firebase.firestore();
    const query = db
      .collection("users")
      .where("screen_name", "==", action.payload);
    const querySnapshotTmp = yield call([query, query.get]);
    const querySnapshot = querySnapshotTmp as firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>; // TODO fix
    const user: User = querySnapshot.docs[0].data() as User;

    // user 정보 가져오기 성공
    yield put(fetchAsync.success(user));
  } catch (e) {
    // user 정보 가져오기 에러
    yield put(fetchAsync.failure(e));
  }
}

export function* userSaga() {
  yield takeLatest(FETCH, fetchSaga);
}
