// modules
import { StateCreator } from "zustand";

// types and interfaces
export interface MotiveSliceInterface {
  currentMotive: number;
  motiveName: string;
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

// default motive
const defaultMotive = motiveData.find((motive) => {
  return motive.name == "Explore";
});

// slice
export const motiveSlice: StateCreator<MotiveSliceInterface, []> = (set) => ({
  currentMotive: defaultMotive!.id,
  motiveName: defaultMotive!.name,
  warships: defaultMotive!.warships,
  nonWarships: defaultMotive!.nonWarships,
  adventureCards: defaultMotive!.adventureCards,
  treasure: defaultMotive!.treasure,
  liberation: defaultMotive!.liberation,
  scienceDiscovered: defaultMotive!.scienceDiscovered,
  wondersSeen: defaultMotive!.wondersSeen,
  actTwoCards: defaultMotive!.actTwoCards,
  actThreeCards: defaultMotive!.actThreeCards,

  setCurrentMotive: (newMotive: number) => {
    let motiveProps = motiveData[newMotive];
    set(() => ({
      currentMotive: newMotive,
      motiveName: motiveProps.name,
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
