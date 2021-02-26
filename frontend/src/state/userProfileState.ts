import { atom } from "recoil";
import type { UserProfile } from "../entities/UserProfile";

const userProfileState = atom<UserProfile | null>({
  key: "userState",
  default: null,
});

export { userProfileState };
