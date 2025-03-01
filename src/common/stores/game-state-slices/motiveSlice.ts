import { StateCreator } from "zustand";
import motives from "../../data/motives.json";

export type MotiveType = {
  id: number;
  name: string;
  warships: number;
  non_warships: number;
  adventure_cards: number;
  treasure: number;
  liberation: number;
  science_discovered: number;
  wonders_seen: number;
  act_two_cards: number;
  act_three_cards: number;
};

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
