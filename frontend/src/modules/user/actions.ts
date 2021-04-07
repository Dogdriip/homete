import { createAsyncAction } from "typesafe-actions";
import { User } from "../../types/User";

export const FETCH = "user/FETCH" as const;
export const FETCH_SUCCESS = "user/FETCH_SUCCESS" as const;
export const FETCH_FAILURE = "user/FETCH_FAILURE" as const;

export const fetchAsync = createAsyncAction(
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
)<string, User, Error>();
