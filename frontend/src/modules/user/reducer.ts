import { createReducer } from "typesafe-actions";
import { UserState, UserAction } from "./types";
import {
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_CONTRIBUTOR,
  FETCH_CONTRIBUTOR_SUCCESS,
  FETCH_CONTRIBUTOR_FAILURE,
} from "./actions";

const initialState: UserState = {
  loading: {
    FETCH: false,
    FETCH_CONTRIBUTOR: false,
  },
  user: null,
  contributor: null,
};

const reducer = createReducer<UserState, UserAction>(initialState, {
  [FETCH]: (state) => ({
    ...state,
    loading: { ...state.loading, FETCH: true },
  }),
  [FETCH_SUCCESS]: (state, action) => ({
    ...state,
    loading: { ...state.loading, FETCH: false },
    user: action.payload,
  }),
  [FETCH_FAILURE]: (state) => ({
    ...state,
    loading: { ...state.loading, FETCH: false },
  }),
  [FETCH_CONTRIBUTOR]: (state) => ({
    ...state,
    loading: { ...state.loading, FETCH_CONTRIBUTOR: true },
  }),
  [FETCH_CONTRIBUTOR_SUCCESS]: (state, action) => ({
    ...state,
    loading: { ...state.loading, FETCH_CONTRIBUTOR: false },
    contributor: action.payload,
  }),
  [FETCH_CONTRIBUTOR_FAILURE]: (state) => ({
    ...state,
    loading: { ...state.loading, FETCH_CONTRIBUTOR: false },
  }),
});

export default reducer;
