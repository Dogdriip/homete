import { atom } from "recoil";
import type { Homete } from "../entities/Homete";

const unresolvedHometesState = atom<Homete[] | null>({
  key: "unresolvedHometesState",
  default: [],
});

export { unresolvedHometesState };
