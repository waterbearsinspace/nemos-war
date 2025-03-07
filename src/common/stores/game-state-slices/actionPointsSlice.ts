// modules
import { StateCreator } from "zustand";

// types and interfaces
export interface ActionPointsSliceInterface {
  currentActionPoints: number;
  adjustActionPoints: (by: number) => void;
  cleanUpActionPoints: () => void;
}

// data and constants
const maxActionPoints = 5;
const maxSavedActionPoints = 1;

// slice
export const actionPointsSlice: StateCreator<ActionPointsSliceInterface, []> = (
  set
) => ({
  currentActionPoints: 0,

  adjustActionPoints: (by) =>
    set((state) => ({
      currentActionPoints:
        state.currentActionPoints + by > maxActionPoints
          ? maxActionPoints
          : state.currentActionPoints + by,
    })),

  cleanUpActionPoints: () =>
    set((state) => ({
      currentActionPoints:
        state.currentActionPoints > maxSavedActionPoints
          ? maxSavedActionPoints
          : state.currentActionPoints,
    })),
});
