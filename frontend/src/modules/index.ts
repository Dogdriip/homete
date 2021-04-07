import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth,
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer<any, any>(persistConfig, rootReducer);
