// modules
import { StateCreator } from "zustand";

// types and interfaces
export interface ActionPointsSliceInterface {
  lullTurn: boolean;
  currentActionPoints: number;
  setCurrentActionPoints: (to: number) => void;
}

// data and constants
export const maxSavedActionPoints = 1;
const startingActionPoints = 1;

// slice
export const actionPointsSlice: StateCreator<ActionPointsSliceInterface, []> = (
  set
) => ({
  lullTurn: false,

  currentActionPoints: startingActionPoints,
  setCurrentActionPoints: (to) =>
    set(() => ({
      currentActionPoints: to,
    })),
});
