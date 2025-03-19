import { StateCreator } from "zustand";

// types and interfaces
export interface GamePhaseSliceInterface {
  phase: number;
  subPhase: number | null;
  setPhase: (newPhase: number) => void;
  setSubPhase: (newSubPhase: number) => void;
}

// data and constants
export const gamePhases = Object.freeze({
  0: "MENU",
  1: "SETUP",
  3: "PLAYING",
});
export const gameSubPhases = Object.freeze({
  0: "MOTIVE",
  1: "DRAWPILEANDADVENTUREDECK",
  2: "UPGRADE",
  3: "SHIPS",
  4: "DONE",
  5: "DRAW",
  6: "RESOLVE",
  7: "CURRENTACTROLL",
  8: "STANDARDPLACEMENT",
  9: "LULLPLACEMENT",
  10: "ADVENTURE",
  11: "ATTACK",
  12: "INCITE",
  13: "MOVE",
  14: "REST",
  15: "REPAIR",
  16: "REFIT",
  17: "SEARCH",
});

// slice
export const gamePhaseSlice: StateCreator<GamePhaseSliceInterface, []> = (
  set
) => ({
  phase: 0,
  subPhase: null,

  setPhase: (newPhase) => set(() => ({ phase: newPhase })),
  setSubPhase: (newSubPhase) => set(() => ({ subPhase: newSubPhase })),
});
