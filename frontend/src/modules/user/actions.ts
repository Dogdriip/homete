import { createAsyncAction } from "typesafe-actions";
import { User } from "../../types/User";

export const FETCH = "user/FETCH" as const;
export const FETCH_SUCCESS = "user/FETCH_SUCCESS" as const;
export const FETCH_FAILURE = "user/FETCH_FAILURE" as const;
export const FETCH_CONTRIBUTOR = "user/FETCH_CONTRIBUTOR" as const;
export const FETCH_CONTRIBUTOR_SUCCESS = "user/FETCH_CONTRIBUTOR_SUCCESS" as const;
export const FETCH_CONTRIBUTOR_FAILURE = "user/FETCH_CONTRIBUTOR_FAILURE" as const;

export const fetchAsync = createAsyncAction(
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
)<string, User, Error>();

export const fetchContributorAsync = createAsyncAction(
  FETCH_CONTRIBUTOR,
  FETCH_CONTRIBUTOR_SUCCESS,
  FETCH_CONTRIBUTOR_FAILURE,
)<string, string, Error>();
