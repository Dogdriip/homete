import { selector } from "recoil";
import type { Homete } from "../entities/Homete";
import { hometesState } from "./hometesState";

const resolvedHometesState = selector<Homete[] | null>({
  key: "resolvedHometesState",
  get: ({ get }) => {
    const hometes = get(hometesState);
    return hometes.filter((homete) => homete.resolved);
  },
});

export { resolvedHometesState };
