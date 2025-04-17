import { StateCreator } from "zustand";

// types and interfaces
export interface GamePhaseSliceInterface {
  currentPhase: number;
  currentSubPhase: number | null;
  showNextPhaseButton: boolean;
  isLullTurn: boolean;
  gameLost: boolean;

  setCurrentPhase: (to: number) => void;
  setCurrentSubPhase: (to: number) => void;
  setShowNextPhaseButton: (to: boolean) => void;
  setIsLullTurn: (to: boolean) => void;
  setGameLost: (to: boolean) => void;
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
  11: "ACTION SELECT",
  12: "DRAW ADVENTURE CARD",
  13: "RESOLVE ADVENTURE CARD",
  14: "ATTACK",
  15: "INCITE",
  16: "MOVE",
  17: "REST",
  18: "REPAIR",
  19: "REFIT",
  20: "SEARCH",
  21: "GAME OVER",
});

// slice
export const gamePhaseSlice: StateCreator<GamePhaseSliceInterface, []> = (
  set
) => ({
  currentPhase: 0,
  currentSubPhase: 0,
  showNextPhaseButton: false,
  isLullTurn: false,
  gameLost: false,

  setCurrentPhase: (to) => set(() => ({ currentPhase: to })),
  setCurrentSubPhase: (to) => set(() => ({ currentSubPhase: to })),
  setShowNextPhaseButton: (to) => set(() => ({ showNextPhaseButton: to })),
  setIsLullTurn: (to) => set(() => ({ isLullTurn: to })),
  setGameLost: (to) => set(() => ({ gameLost: to })),
});
