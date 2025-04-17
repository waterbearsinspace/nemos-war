// modules
import { StateCreator } from "zustand";

// types and interfaces
export interface NotorietySliceInterface {
  notoriety: number;
  reinforcementGroupEAdded: boolean;
  reinforcementGroupDAdded: boolean;
  warshipsFlipped: boolean;
  blackPlacementDieAdded: boolean;

  setNotoriety: (to: number) => void;
  setReinforcementGroupEAdded: (to: boolean) => void;
  setReinforcementGroupDAdded: (to: boolean) => void;
  setWarshipsFlipped: (to: boolean) => void;
  setBlackPlacementDieAdded: (to: boolean) => void;
}

// data and constants
export const test = 1;

// slice
export const notorietySlice: StateCreator<NotorietySliceInterface, []> = (
  set
) => ({
  notoriety: 0,
  reinforcementGroupDAdded: false,
  reinforcementGroupEAdded: false,
  warshipsFlipped: false,
  blackPlacementDieAdded: false,

  setNotoriety: (to) =>
    set(() => ({
      notoriety: to,
    })),
  setReinforcementGroupDAdded: (to) =>
    set(() => ({ reinforcementGroupDAdded: to })),
  setReinforcementGroupEAdded: (to) =>
    set(() => ({ reinforcementGroupEAdded: to })),
  setWarshipsFlipped: (to) => set(() => ({ warshipsFlipped: to })),
  setBlackPlacementDieAdded: (to) =>
    set(() => ({ blackPlacementDieAdded: to })),
});
