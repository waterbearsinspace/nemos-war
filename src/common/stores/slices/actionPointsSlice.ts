// modules
import { StateCreator } from "zustand";

// types and interfaces
export interface ActionPointsSliceInterface {
  actionPointsCurrent: number;

  setActionPointsCurrent: (to: number) => void;
}

// data and constants
export const maxSavedActionPoints = 1;
const startingActionPoints = 1;

// slice
export const actionPointsSlice: StateCreator<ActionPointsSliceInterface, []> = (
  set
) => ({
  actionPointsCurrent: startingActionPoints,

  setActionPointsCurrent: (to) =>
    set(() => ({
      actionPointsCurrent: to,
    })),
});
