// modules
import { StateCreator } from "zustand";

// types and interfaces
export interface ActionPointsSliceInterface {
  currentActionPoints: number;
  maxActionPoints: number;
  //   cleanUpActionPoints: void () => void;
}

// slice
export const actionPointsSlice: StateCreator<ActionPointsSliceInterface, []> = (
  set
) => ({
  currentActionPoints: 0,
  maxActionPoints: 5,

  // cleanUpActionPoints
  // if actionPoints > 1
  //    set to 1
  // else set to actionPoints
});
