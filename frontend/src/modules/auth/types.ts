import { ActionType } from "typesafe-actions";
import { Auth } from "../../types/Auth";
import * as actions from "./actions";

export type AuthAction = ActionType<typeof actions>;

export type AuthState = {
  loading: {
    LOGIN: boolean;
    LOGOUT: boolean;
  };
  auth: Auth;
};
