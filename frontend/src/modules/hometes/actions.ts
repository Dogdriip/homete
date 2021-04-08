import { createAsyncAction } from "typesafe-actions";
import { Homete } from "../../types/Homete";

export const FETCH = "hometes/FETCH" as const;
export const FETCH_SUCCESS = "hometes/FETCH_SUCCESS" as const;
export const FETCH_FAILURE = "hometes/FETCH_FAILURE" as const;
export const SEND = "hometes/SEND" as const;
export const SEND_SUCCESS = "hometes/SEND_SUCCESS" as const;
export const SEND_FAILURE = "hometes/SEND_FAILURE" as const;

export const fetchAsync = createAsyncAction(
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
)<string, Homete[], Error>();

export const sendAsync = createAsyncAction(SEND, SEND_SUCCESS, SEND_FAILURE)<
  { recipient: string; description: string },
  void,
  Error
>();
