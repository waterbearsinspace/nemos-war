// modules
import { StateCreator } from "zustand";

// types and
type motive = {
  id: number;
  name: string;
  warships: number;
  nonWarships: number;
  adventureCards: number;
  treasure: number;
  liberation: number;
  scienceDiscovered: number;
  wondersSeen: number;
  actTwoCards: number;
  actThreeCards: number;
  gameOver: number;
};

export interface MotiveSliceInterface {
  currentMotive: motive;

  setCurrentMotive: (to: motive) => void;
}

// data and constants
import motiveData from "../../data/motives.json";

// slice
export const motiveSlice: StateCreator<MotiveSliceInterface, []> = (set) => ({
  currentMotive: motiveData[1],

  setCurrentMotive: (to: motive) => {
    set(() => ({
      currentMotive: to,
    }));
  },
});
