import { createAsyncAction } from "typesafe-actions";
import { Auth } from "../../types/Auth";

export const LOGIN = "auth/LOGIN" as const;
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS" as const;
export const LOGIN_FAILURE = "auth/LOGIN_FAILURE" as const;
export const LOGOUT = "auth/LOGOUT" as const;
export const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS" as const;
export const LOGOUT_FAILURE = "auth/LOGOUT_FAILURE" as const;

export const loginAsync = createAsyncAction(
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
)<void, Auth, Error>();

export const logoutAsync = createAsyncAction(
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
)<void, void, Error>();
