import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN, loginAsync, LOGOUT, logoutAsync } from "./actions";
import { toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import firebase from "firebase/app";
import * as api from "../../lib/api";
import { Auth } from "../../types/Auth";
import { User } from "../../types/User";

function* loginSaga(action: ReturnType<typeof loginAsync.request>) {
  try {
    // 로그인 시도
    const result = yield call(api.loginWithTwitter);

    // 로그인 성공
    const credential: firebase.auth.OAuthCredential = result.credential;
    const token = credential.accessToken;
    const secret = credential.secret;

    const user = result.user;
    const additionalUserInfo = result.additionalUserInfo;
    const profile = additionalUserInfo.profile;

    const authVal: Auth = {
      uid: user.uid,
      screen_name: profile["screen_name"],
      token,
      secret,
    };

    // db에 프로필 정보 갱신
    const userVal: User = {
      uid: user.uid,
      name: profile["name"],
      screen_name: profile["screen_name"],
      description: profile["description"],
      profile_image_url: profile["profile_image_url"].replace("_normal", ""),
      profile_image_url_https: profile["profile_image_url_https"].replace(
        "_normal",
        "",
      ),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    yield call(api.setUserByUid, user.uid, userVal);

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

function* logoutSaga(action: ReturnType<typeof logoutAsync.request>) {
  try {
    // 로그아웃 시도
    yield call(api.logout);

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
