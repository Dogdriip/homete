import { createReducer } from "typesafe-actions";
import { HometesState, HometesAction } from "./types";
import {
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  SEND,
  SEND_SUCCESS,
  SEND_FAILURE,
  APPROVE,
  APPROVE_SUCCESS,
  APPROVE_FAILURE,
  REJECT,
  REJECT_SUCCESS,
  REJECT_FAILURE,
} from "./actions";

const initialState: HometesState = {
  loading: {
    FETCH: false,
    SEND: false,
    APPROVE: false,
    REJECT: false,
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
  [APPROVE]: (state) => ({
    ...state,
    loading: { ...state.loading, APPROVE: true },
  }),
  [APPROVE_SUCCESS]: (state, action) => ({
    ...state,
    loading: { ...state.loading, APPROVE: false },
    hometes: state.hometes.map((homete) =>
      homete.id === action.payload ? { ...homete, resolved: true } : homete,
    ),
  }),
  [APPROVE_FAILURE]: (state) => ({
    ...state,
    loading: { ...state.loading, APPROVE: false },
  }),
  [REJECT]: (state) => ({
    ...state,
    loading: { ...state.loading, REJECT: true },
  }),
  [REJECT_SUCCESS]: (state, action) => ({
    ...state,
    loading: { ...state.loading, REJECT: false },
    hometes: state.hometes.filter((homete) => homete.id !== action.payload),
  }),
  [REJECT_FAILURE]: (state) => ({
    ...state,
    loading: { ...state.loading, REJECT: false },
  }),
});

export default reducer;
