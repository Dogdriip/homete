import { selector } from "recoil";
import type { Homete } from "../entities/Homete";
import { hometesState } from "./hometesState";

const unresolvedHometesState = selector<Homete[] | null>({
  key: "unresolvedHometesState",
  get: ({ get }) => {
    const hometes = get(hometesState);
    return hometes.filter((homete) => !homete.resolved);
  },
});

export { unresolvedHometesState };
