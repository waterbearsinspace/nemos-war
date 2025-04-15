// modules
import { StateCreator } from "zustand";

// types and interfaces
export interface NotorietySliceInterface {
  notoriety: number;
  setNotoriety: (to: number) => void;
}

// data and constants
export const test = 1;

// slice
export const notorietySlice: StateCreator<NotorietySliceInterface, []> = (
  set
) => ({
  notoriety: 0,
  setNotoriety: (to) =>
    set(() => ({
      notoriety: to,
    })),
});
