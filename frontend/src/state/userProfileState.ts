import { atom } from "recoil";
import type { UserProfile } from "../entities/UserProfile";

const userProfileState = atom<UserProfile | null>({
  key: "userState",
  default: {
    uid: null,
    name: null,
    screen_name: null,
    description: null,
    profile_image_url: null,
    profile_image_url_https: null,
    timestamp: null,
  },
});

export { userProfileState };
