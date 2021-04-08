import { createAsyncAction } from "typesafe-actions";
import { Homete } from "../../types/Homete";

export const FETCH = "hometes/FETCH" as const;
export const FETCH_SUCCESS = "hometes/FETCH_SUCCESS" as const;
export const FETCH_FAILURE = "hometes/FETCH_FAILURE" as const;
export const SEND = "hometes/SEND" as const;
export const SEND_SUCCESS = "hometes/SEND_SUCCESS" as const;
export const SEND_FAILURE = "hometes/SEND_FAILURE" as const;
export const APPROVE = "hometes/APPROVE" as const;
export const APPROVE_SUCCESS = "hometes/APPROVE_SUCCESS" as const;
export const APPROVE_FAILURE = "hometes/APPROVE_FAILURE" as const;
export const REJECT = "hometes/REJECT" as const;
export const REJECT_SUCCESS = "hometes/REJECT_SUCCESS" as const;
export const REJECT_FAILURE = "hometes/REJECT_FAILURE" as const;

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

export const approveAsync = createAsyncAction(
  APPROVE,
  APPROVE_SUCCESS,
  APPROVE_FAILURE,
)<string, string, Error>();

export const rejectAsync = createAsyncAction(
  REJECT,
  REJECT_SUCCESS,
  REJECT_FAILURE,
)<string, string, Error>();
