import { ActionType } from "typesafe-actions";
import { User } from "../../types/User";
import * as actions from "./actions";

export type UserAction = ActionType<typeof actions>;

export type UserState = {
  loading: {
    FETCH: boolean;
  };
  user: User;
};
