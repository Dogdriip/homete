import { atom } from "recoil";
import type { UserProfile } from "../entities/UserProfile";

const userProfileState = atom<UserProfile | "PENDING" | null>({
  key: "userProfileState",
  default: "PENDING",
});

export { userProfileState };
