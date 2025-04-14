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
  addToCurrentUpgrades: (newUpgrade: upgrade) => void;
  addToPossibleUpgrades: (newUpgrade: upgrade) => void;
  setUnusedUpgrades: (newUnusedUpgrades: upgrade[]) => void;
  hydroMoved: boolean;
  setHydroMoved: (to: boolean) => void;
}

// slice
export const upgradesSlice: StateCreator<UpgradesSliceInterface, []> = (
  set
) => ({
  currentUpgrades: [],
  possibleUpgrades: [],
  unusedUpgrades: [],

  addToCurrentUpgrades: (newUpgrade) => {
    set((state) => ({
      currentUpgrades: [...state.currentUpgrades, newUpgrade],
      possibleUpgrades: state.possibleUpgrades.filter((upgrade) => {
        return upgrade.id != newUpgrade.id;
      }),
    }));
  },
  addToPossibleUpgrades: (newUpgrade) => {
    set((state) => ({
      possibleUpgrades: [...state.possibleUpgrades, newUpgrade],
      unusedUpgrades: state.unusedUpgrades.filter((upgrade) => {
        return upgrade.id != newUpgrade.id;
      }),
    }));
  },
  setUnusedUpgrades: (newUnusedUpgrades) => {
    set(() => ({
      unusedUpgrades: newUnusedUpgrades,
    }));
  },

  hydroMoved: false,
  setHydroMoved: (to) => {
    set(() => ({ hydroMoved: to }));
  },
});
