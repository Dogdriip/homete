import { createReducer } from "typesafe-actions";
import { HometesState, HometesAction } from "./types";
import {
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  SEND,
  SEND_SUCCESS,
  SEND_FAILURE,
} from "./actions";

const initialState: HometesState = {
  loading: {
    FETCH: false,
    SEND: false,
  },
  hometes: [],
};

const reducer = createReducer<HometesState, HometesAction>(initialState, {
  [FETCH]: (state) => ({
    ...state,
    loading: { ...state.loading, FETCH: true },
  }),
  [FETCH_SUCCESS]: (state, action) => ({
    ...state,
    loading: { ...state.loading, FETCH: false },
    hometes: action.payload,
  }),
  [FETCH_FAILURE]: (state) => ({
    ...state,
    loading: { ...state.loading, FETCH: false },
  }),
  [SEND]: (state) => ({
    ...state,
    loading: { ...state.loading, SEND: true },
  }),
  [SEND_SUCCESS]: (state) => ({
    ...state,
    loading: { ...state.loading, SEND: false },
  }),
  [SEND_FAILURE]: (state) => ({
    ...state,
    loading: { ...state.loading, SEND: false },
  }),
});

export default reducer;
