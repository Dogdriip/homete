import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN, loginAsync, LOGOUT, logoutAsync } from "./actions";
import { toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Auth } from "../../types/Auth";

function* loginSaga(action) {
  try {
    // 로그인 시도
    const auth = firebase.auth();
    const provider = new firebase.auth.TwitterAuthProvider();
    const result = yield call([auth, auth.signInWithPopup], provider);

    // 로그인 성공
    const credential: firebase.auth.OAuthCredential = result.credential;
    const token = credential.accessToken;
    const secret = credential.secret;

    const user = result.user;
    const additionalUserInfo = result.additionalUserInfo;
    const profile = additionalUserInfo.profile;

    const authVal: Auth = {
      uid: user.uid,
      name: profile["name"],
      screen_name: profile["screen_name"],
      token,
      secret,
    };

    // 로그인 완료
    toast({
      title: "로그인 완료!",
      type: "success",
      description: `@${profile["screen_name"]}으로 로그인되었습니다.`,
      time: 3000,
      animation: "fade left",
    });
    yield put(loginAsync.success(authVal));
  } catch (e) {
    // 로그인 에러
    toast({
      title: "로그인 실패...",
      type: "error",
      description: `로그인에 실패했습니다.`,
      time: 3000,
      animation: "fade left",
    });
    yield put(loginAsync.failure(e));
  }
}

function* logoutSaga(action) {
  try {
    // 로그아웃 시도
    const auth = firebase.auth();
    yield call([auth, auth.signOut]);

    // 로그아웃 완료
    toast({
      title: "로그아웃 완료!",
      type: "success",
      description: "로그아웃 되었습니다.",
      time: 3000,
      animation: "fade left",
    });
    yield put(logoutAsync.success());
  } catch (e) {
    // 로그아웃 에러
    toast({
      title: "로그아웃 실패...",
      type: "error",
      description: `로그아웃에 실패했습니다.`,
      time: 3000,
      animation: "fade left",
    });
    yield put(logoutAsync.failure(e));
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}
