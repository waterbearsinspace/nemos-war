// free ships
// ships in ship pool

// groups
// white: A - non-warships
// gray: J - early warships on back of non-warships
// lightYellow: B - early warships
// blue: D - notoriety warships
// green: E - notoriety warships
// darkYellow - C - modern warships
// orange - F - modern warships
// red - G - modern warships
// black - H - special event warships
// purple - J - up-gunned warships

// const shipGroups = Object.freeze({
//   A: "white",
//   J: "gray,",
// });

import { StateCreator } from "zustand";

// types and interfaces
import { vp } from "../../scripts/calculateVictoryPoints";

export type ship = {
  id: number;
  name: string;
  attackStrength: number | null;
  defenseStrength: number;
  notoriety: number;
  groupId: string;
  nationality: string;
  shipClass: string;
  vp: vp;
  flipName?: string;
  flipAttackStrength?: number | null;
  flipDefenseStrength?: number;
  flipNotoriety?: number;
  flipGroupId?: string;
  flipNationality?: string;
  flipShipClass?: string;
  flipVp?: vp;
  flipped: boolean;
};

export interface ShipPoolsSliceInterface {
  currentShipPool: ship[];
  unusedShipPool: ship[];

  setCurrentShipPool: (to: ship[]) => void;
  setUnusedShipPool: (to: ship[]) => void;
}

// slice
export const shipPoolsSlice: StateCreator<ShipPoolsSliceInterface, []> = (
  set
) => ({
  currentShipPool: [],
  unusedShipPool: [],

  setCurrentShipPool: (to) => set(() => ({ currentShipPool: to })),
  setUnusedShipPool: (to) => set(() => ({ unusedShipPool: to })),
});
