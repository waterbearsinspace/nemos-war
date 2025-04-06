import { StateCreator } from "zustand";

// types and interfaces
export interface GamePhaseSliceInterface {
  currentPhase: number;
  currentSubPhase: number | null;
  setCurrentPhase: (newPhase: number) => void;
  setCurrentSubPhase: (newSubPhase: number) => void;
  showNextPhaseButton: boolean;
  setShowNextPhaseButton: (to: boolean) => void;
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
  11: "STANDARD ACTION",
  12: "LULL ACTION",
  13: "ATTACK",
  14: "INCITE",
  15: "MOVE",
  16: "REST",
  17: "REPAIR",
  18: "REFIT",
  19: "SEARCH",
});

// slice
export const gamePhaseSlice: StateCreator<GamePhaseSliceInterface, []> = (
  set
) => ({
  currentPhase: 0,
  currentSubPhase: 0,
  showNextPhaseButton: false,

  setCurrentPhase: (newPhase) => set(() => ({ currentPhase: newPhase })),
  setCurrentSubPhase: (newSubPhase) =>
    set(() => ({ currentSubPhase: newSubPhase })),
  setShowNextPhaseButton: (to) => set(() => ({ showNextPhaseButton: to })),
});
