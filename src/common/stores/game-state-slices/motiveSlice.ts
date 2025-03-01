import { StateCreator } from "zustand";

export interface MotiveSliceInterface {
  currentMotive: number;
  setCurrentMotive: (by: number) => void;
}

export const motiveSlice: StateCreator<MotiveSliceInterface, []> = (set) => ({
  currentMotive: 0,
  setCurrentMotive: (newMotive: number) => {
    set(() => ({
      currentMotive: newMotive,
    }));
  },
});

// current motive
// change motive
