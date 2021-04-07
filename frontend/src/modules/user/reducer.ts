import { createReducer } from "typesafe-actions";
import { UserState, UserAction } from "./types";
import { FETCH, FETCH_SUCCESS, FETCH_FAILURE } from "./actions";

const initialState: UserState = {
  loading: {
    FETCH: false,
  },
  user: null,
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
});

export default reducer;
