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
  // set current upgrades
  // set possible upgrades
}

// slice
export const upgradesSlice: StateCreator<UpgradesSliceInterface, []> = (
  set
) => ({ currentUpgrades: [], possibleUpgrades: [] });
