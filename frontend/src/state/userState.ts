import { atom } from "recoil";
import type { User } from "../entities/User";

const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export { userState };
