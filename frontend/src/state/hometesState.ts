import { atom } from "recoil";
import type { Homete } from "../entities/Homete";

const hometesState = atom<Homete[] | null>({
  key: "hometesState",
  default: null,
});

export { hometesState };
