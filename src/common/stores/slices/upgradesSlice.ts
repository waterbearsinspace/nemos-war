// modules
import { StateCreator } from "zustand";

// types and interfaces
type upgrade = {
  id: number;
  name: string;
  flavorText: string;
  vp?: Object;
  cost: number;
  motive?: string;
};
export interface UpgradesSliceInterface {
  currentUpgrades: upgrade[];
  possibleUpgrades: upgrade[];
  unusedUpgrades: upgrade[];
  hydroMoved: boolean;

  addToCurrentUpgrades: (to: upgrade) => void;
  addToPossibleUpgrades: (to: upgrade) => void;
  setUnusedUpgrades: (to: upgrade[]) => void;
  setHydroMoved: (to: boolean) => void;
}

// slice
export const upgradesSlice: StateCreator<UpgradesSliceInterface, []> = (
  set
) => ({
  currentUpgrades: [],
  possibleUpgrades: [],
  unusedUpgrades: [],
  hydroMoved: false,

  addToCurrentUpgrades: (to) => {
    set((state) => ({
      currentUpgrades: [...state.currentUpgrades, to],
      possibleUpgrades: state.possibleUpgrades.filter((upgrade) => {
        return upgrade.id != to.id;
      }),
    }));
  },
  addToPossibleUpgrades: (to) => {
    set((state) => ({
      possibleUpgrades: [...state.possibleUpgrades, to],
      unusedUpgrades: state.unusedUpgrades.filter((upgrade) => {
        return upgrade.id != to.id;
      }),
    }));
  },
  setUnusedUpgrades: (to) => {
    set(() => ({
      unusedUpgrades: to,
    }));
  },
  setHydroMoved: (to) => {
    set(() => ({ hydroMoved: to }));
  },
});
