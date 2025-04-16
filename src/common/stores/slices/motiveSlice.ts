// modules
import { StateCreator } from "zustand";

// types and interfaces
export interface MotiveSliceInterface {
  currentMotive: number;
  motiveName: string;
  motiveWarships: number;
  motiveNonWarships: number;
  motiveAdventureCards: number;
  motiveTreasure: number;
  motiveLiberation: number;
  motiveScienceDiscovered: number;
  motiveWondersSeen: number;
  motiveActTwoCards: number;
  motiveActThreeCards: number;
  motiveGameOver: number;
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
  motiveWarships: defaultMotive!.warships,
  motiveNonWarships: defaultMotive!.nonWarships,
  motiveAdventureCards: defaultMotive!.adventureCards,
  motiveTreasure: defaultMotive!.treasure,
  motiveLiberation: defaultMotive!.liberation,
  motiveScienceDiscovered: defaultMotive!.scienceDiscovered,
  motiveWondersSeen: defaultMotive!.wondersSeen,
  motiveActTwoCards: defaultMotive!.actTwoCards,
  motiveActThreeCards: defaultMotive!.actThreeCards,
  motiveGameOver: defaultMotive!.gameOver,

  setCurrentMotive: (newMotive: number) => {
    let motiveProps = motiveData[newMotive];
    set(() => ({
      currentMotive: newMotive,
      motiveName: motiveProps.name,
      motiveWarships: motiveProps.warships,
      motiveNonWarships: motiveProps.nonWarships,
      motiveAdventureCards: motiveProps.adventureCards,
      motiveTreasure: motiveProps.treasure,
      motiveLiberation: motiveProps.liberation,
      motiveScienceDiscovered: motiveProps.scienceDiscovered,
      motiveWondersSeen: motiveProps.wondersSeen,
      motiveActTwoCards: motiveProps.actTwoCards,
      motiveActThreeCards: motiveProps.actThreeCards,
      motiveGameOver: motiveProps.gameOver,
    }));
  },
});
