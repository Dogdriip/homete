import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
import hometes, { hometesSaga } from "./hometes";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth,
  user,
  hometes,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), hometesSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer<any, any>(persistConfig, rootReducer);
