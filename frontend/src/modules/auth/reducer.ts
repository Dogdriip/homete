import { createReducer } from "typesafe-actions";
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
  [LOGIN]: (state) => ({
    ...state,
    loading: { ...state.loading, LOGIN: true },
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    loading: { ...state.loading, LOGIN: false },
    auth: action.payload,
  }),
  [LOGIN_FAILURE]: (state) => ({
    ...state,
    loading: { ...state.loading, LOGIN: false },
  }),
  [LOGOUT]: (state) => ({
    ...state,
    loading: { ...state.loading, LOGOUT: true },
  }),
  [LOGOUT_SUCCESS]: (state) => ({
    ...state,
    loading: { ...state.loading, LOGOUT: false },
    auth: null,
  }),
  [LOGOUT_FAILURE]: (state) => ({
    ...state,
    loading: { ...state.loading, LOGOUT: false },
  }),
});

export default reducer;
