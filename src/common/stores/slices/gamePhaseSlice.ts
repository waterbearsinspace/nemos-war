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
export const gameSubPhases = Object.freeze({
  0: "MENU",
  1: "SELECT MOTIVE",
  2: "PREP DRAW PILE AND ADVENTURE DECK",
  3: "SELECT UPGRADE",
  4: "PREP SHIPS",
  5: "CONFIRM SETUP",
  6: "DRAW AND RESOLVE CARD",
  7: "PLACEMENT DICE ROLL",
  8: "STANDARD PLACEMENT",
  9: "LULL PLACEMENT",
  10: "SELECT ACTION",
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
  subPhase: 0,

  setPhase: (newPhase) => set(() => ({ phase: newPhase })),
  setSubPhase: (newSubPhase) => set(() => ({ subPhase: newSubPhase })),
});
