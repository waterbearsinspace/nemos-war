// modules
import { StateCreator } from "zustand";

// types and interfaces
type Upgrade = {
  id: number;
  name: string;
  flavorText: string;
  vp?: Object;
  cost: number;
  motive?: string;
};
export interface UpgradesSliceInterface {
  currentUpgrades: Upgrade[];
  possibleUpgrades: Upgrade[];
  unusedUpgrades: Upgrade[];
  addToCurrentUpgrades: (newUpgrade: Upgrade) => void;
  addToPossibleUpgrades: (newUpgrade: Upgrade) => void;
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
});
