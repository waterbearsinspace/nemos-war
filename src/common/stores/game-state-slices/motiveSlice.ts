import { StateCreator } from "zustand";

import motiveData from "../../data/motives.json";

export interface MotiveSliceInterface {
  currentMotive: number;
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
  setCurrentMotive: (by: number) => void;
}

export const motiveSlice: StateCreator<MotiveSliceInterface, []> = (set) => ({
  currentMotive: 0,
  name: "War!",
  warships: 2,
  non_warships: 0,
  adventure_cards: -1,
  treasure: 0,
  liberation: 4,
  science_discovered: 3,
  wonders_seen: 2,
  act_two_cards: 3,
  act_three_cards: 13,

  setCurrentMotive: (newMotive: number) => {
    let motiveProps = motiveData[newMotive];
    set(() => ({
      currentMotive: newMotive,
      name: motiveProps.name,
      warships: motiveProps.warships,
      non_warships: motiveProps.non_warships,
      adventure_cards: motiveProps.adventure_cards,
      treasure: motiveProps.treasure,
      liberation: motiveProps.liberation,
      science_discovered: motiveProps.science_discovered,
      wonders_seen: motiveProps.wonders_seen,
      act_two_cards: motiveProps.act_two_cards,
      act_three_cards: motiveProps.act_three_cards,
    }));
  },
});
