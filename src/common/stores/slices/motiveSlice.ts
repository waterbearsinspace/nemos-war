// modules
import { StateCreator } from "zustand";

// types and interfaces
export interface MotiveSliceInterface {
  currentMotive: number;
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
  setCurrentMotive: (by: number) => void;
}

// data and constants
import motiveData from "../../data/motives.json";

// slice
export const motiveSlice: StateCreator<MotiveSliceInterface, []> = (set) => ({
  currentMotive: 0,
  name: "War!",
  warships: 2,
  nonWarships: 0,
  adventureCards: -1,
  treasure: 0,
  liberation: 4,
  scienceDiscovered: 3,
  wondersSeen: 2,
  actTwoCards: 3,
  actThreeCards: 13,

  setCurrentMotive: (newMotive: number) => {
    let motiveProps = motiveData[newMotive];
    set(() => ({
      currentMotive: newMotive,
      name: motiveProps.name,
      warships: motiveProps.warships,
      nonWarships: motiveProps.nonWarships,
      adventureCards: motiveProps.adventureCards,
      treasure: motiveProps.treasure,
      liberation: motiveProps.liberation,
      scienceDiscovered: motiveProps.scienceDiscovered,
      wondersSeen: motiveProps.wondersSeen,
      actTwoCards: motiveProps.actTwoCards,
      actThreeCards: motiveProps.actThreeCards,
    }));
  },
});
