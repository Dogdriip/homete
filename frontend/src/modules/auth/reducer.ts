import { createReducer } from "typesafe-actions";
import { produce } from "immer";
import { AuthState, AuthAction } from "./types";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "./actions";

const initialState: AuthState = {
  loading: {
    LOGIN: false,
    LOGOUT: false,
  },
  auth: null,
};

const reducer = createReducer<AuthState, AuthAction>(initialState, {
  [LOGIN]: (state) =>
    produce(state, (draft) => {
      draft.loading.LOGIN = true;
    }),
  [LOGIN_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loading.LOGIN = false;
      draft.auth = action.payload;
    }),
  [LOGIN_FAILURE]: (state) =>
    produce(state, (draft) => {
      draft.loading.LOGIN = false;
    }),
  [LOGOUT]: (state) =>
    produce(state, (draft) => {
      draft.loading.LOGOUT = true;
    }),
  [LOGOUT_SUCCESS]: (state) =>
    produce(state, (draft) => {
      draft.loading.LOGOUT = false;
      draft.auth = null;
    }),
  [LOGOUT_FAILURE]: (state) =>
    produce(state, (draft) => {
      draft.loading.LOGOUT = false;
    }),
});

export default reducer;
