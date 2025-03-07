// modules
import { StateCreator } from "zustand";

// types and interfaces
export interface ActionPointsSliceInterface {
  currentActionPoints: number;
  adjustActionPoints: (by: number) => void;
  cleanUpActionPoints: () => void;
}

// slice
export const actionPointsSlice: StateCreator<ActionPointsSliceInterface, []> = (
  set
) => ({
  currentActionPoints: 0,

  adjustActionPoints: (by) =>
    set((state) => ({
      currentActionPoints: state.currentActionPoints + by,
    })),

  cleanUpActionPoints: () =>
    set((state) => ({
      currentActionPoints:
        state.currentActionPoints > 1 ? 1 : state.currentActionPoints,
    })),
});
