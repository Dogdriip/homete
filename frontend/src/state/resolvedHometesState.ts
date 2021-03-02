import { atom } from "recoil";
import type { Homete } from "../entities/Homete";

const resolvedHometesState = atom<Homete[] | null>({
  key: "resolvedHometesState",
  default: [],
});

export { resolvedHometesState };
