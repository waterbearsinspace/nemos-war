import { StateCreator } from "zustand";

// types and interfaces
export interface GamePhaseSliceInterface {
  currentPhase: number;
  currentSubPhase: number | null;
  setCurrentPhase: (newPhase: number) => void;
  setCurrentSubPhase: (newSubPhase: number) => void;
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
  6: "DRAW EVENT CARD",
  7: "RESOLVE EVENT CARD",
  8: "PLACEMENT DICE ROLL",
  9: "STANDARD PLACEMENT",
  10: "LULL PLACEMENT",
  11: "SELECT ACTION",
  12: "ATTACK",
  13: "INCITE",
  14: "MOVE",
  15: "REST",
  16: "REPAIR",
  17: "REFIT",
  18: "SEARCH",
});

// slice
export const gamePhaseSlice: StateCreator<GamePhaseSliceInterface, []> = (
  set
) => ({
  currentPhase: 0,
  currentSubPhase: 0,

  setCurrentPhase: (newPhase) => set(() => ({ currentPhase: newPhase })),
  setCurrentSubPhase: (newSubPhase) =>
    set(() => ({ currentSubPhase: newSubPhase })),
});
