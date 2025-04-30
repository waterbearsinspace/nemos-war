// modules
import { StateCreator } from "zustand";
import { vp } from "../../scripts/calculateVictoryPoints";

// types and interfaces
export type treasure = {
  id: number;
  type: string;
  name: string;
  vp: vp;
};

export interface TreasuresSliceInterface {
  treasureDrawPool: treasure[];
  currentTreasures: treasure[];
  currentlyUsedTreasure: treasure | null;

  setTreasureDrawPool: (to: treasure[]) => void;
  setCurrentTreasures: (to: treasure[]) => void;
  setCurrentlyUsedTreasure: (to: treasure | null) => void;
}

// slice
export const treasuresSlice: StateCreator<TreasuresSliceInterface, []> = (
  set
) => ({
  treasureDrawPool: [],
  currentTreasures: [],
  currentlyUsedTreasure: null,

  setTreasureDrawPool: (to) => set(() => ({ treasureDrawPool: to })),
  setCurrentTreasures: (to) => set(() => ({ currentTreasures: to })),
  setCurrentlyUsedTreasure: (to) => set(() => ({ currentlyUsedTreasure: to })),
});
