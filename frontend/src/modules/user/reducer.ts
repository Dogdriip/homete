import { createReducer } from "typesafe-actions";
import { produce } from "immer";
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
  [FETCH]: (state) =>
    produce(state, (draft) => {
      draft.loading.FETCH = false;
    }),
  [FETCH_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loading.FETCH = false;
      draft.user = action.payload;
    }),
  [FETCH_FAILURE]: (state) =>
    produce(state, (draft) => {
      draft.loading.FETCH = false;
    }),
  [FETCH_CONTRIBUTOR]: (state) =>
    produce(state, (draft) => {
      draft.loading.FETCH_CONTRIBUTOR = true;
    }),
  [FETCH_CONTRIBUTOR_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loading.FETCH_CONTRIBUTOR = false;
      draft.contributor = action.payload;
    }),
  [FETCH_CONTRIBUTOR_FAILURE]: (state) =>
    produce(state, (draft) => {
      draft.loading.FETCH_CONTRIBUTOR = false;
    }),
});

export default reducer;
