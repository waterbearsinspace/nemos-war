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
  2: "EVENT",
  3: "PLACEMENT",
  4: "ACTION",
});
export const setupSubphases = Object.freeze({
  0: "MOTIVE",
  1: "DRAWPILEANDADVENTUREDECK",
  2: "UPGRADE",
  3: "SHIPS",
  4: "DONE",
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
