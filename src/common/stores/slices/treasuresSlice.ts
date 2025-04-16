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
  setTreasureDrawPool: (to: treasure[]) => void;
  currentTreasures: treasure[];
  setCurrentTreasures: (to: treasure[]) => void;
}

// slice
export const treasuresSlice: StateCreator<TreasuresSliceInterface, []> = (
  set
) => ({
  treasureDrawPool: [],
  currentTreasures: [],

  setTreasureDrawPool: (newTreasureDrawPool) =>
    set(() => ({ treasureDrawPool: newTreasureDrawPool })),
  setCurrentTreasures: (newTreasureDrawPool) =>
    set(() => ({ currentTreasures: newTreasureDrawPool })),
});
