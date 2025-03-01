import { StateCreator } from "zustand";

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
};

export interface MotiveSliceInterface {
  motiveIndex: number;
  setMotiveIndex: (by: number) => void;
}

export const motiveSlice: StateCreator<MotiveSliceInterface, []> = (set) => ({
  motiveIndex: 0,
  setMotiveIndex: (inc: number) => {
    set(() => ({
      motiveIndex: inc,
    }));
  },
});

// current motive
// change motive
