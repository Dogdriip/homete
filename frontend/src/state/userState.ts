import { atom } from "recoil";

type User = {
  name: string;
};

const userState = atom<User | null>({
  key: "userState",
  default: {
    name: null,
  },
});

export { userState };
