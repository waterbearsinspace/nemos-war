// modules
import { StateCreator } from "zustand";

// types and interfaces
export interface ActionPointsSliceInterface {
  currentActionPoints: number;
  lullTurn: boolean;
  setCurrentActionPoints: (to: number) => void;
  cleanUpActionPoints: () => void;
}

// data and constants
const maxSavedActionPoints = 1;
const startingActionPoints = 1;

// slice
export const actionPointsSlice: StateCreator<ActionPointsSliceInterface, []> = (
  set
) => ({
  currentActionPoints: startingActionPoints,
  lullTurn: false,

  setCurrentActionPoints: (to) =>
    set(() => ({
      currentActionPoints: to,
    })),

  cleanUpActionPoints: () =>
    set((state) => ({
      currentActionPoints:
        state.currentActionPoints > maxSavedActionPoints
          ? maxSavedActionPoints
          : state.currentActionPoints,
    })),
});
