// modules
import { StateCreator } from "zustand";
import { ship } from "./shipPoolsSlice";

// types and interfaces

export interface CombatSliceInterface {
  doneDefending: boolean;
  doneAttacking: boolean;
  attackType: string | null;
  attackTarget: ship | null;
  attackSuccessful: boolean;
  combatPhase: string;
  hitAmount: number | null;

  setDoneDefending: (to: boolean) => void;
  setDoneAttacking: (to: boolean) => void;
  setAttackType: (to: string | null) => void;
  setAttackTarget: (to: ship | null) => void;
  setAttackSuccessful: (to: boolean) => void;
  setCombatPhase: (to: string) => void;
  setHitAmount: (to: number | null) => void;
}

// slice
export const combatSlice: StateCreator<CombatSliceInterface, []> = (set) => ({
  doneDefending: true,
  doneAttacking: true,
  attackType: null,
  attackTarget: null,
  attackSuccessful: false,
  combatPhase: "",
  hitAmount: null,

  setDoneDefending: (to) => set(() => ({ doneDefending: to })),
  setDoneAttacking: (to) => set(() => ({ doneAttacking: to })),
  setAttackType: (to) => set(() => ({ attackType: to })),
  setAttackTarget: (to) => set(() => ({ attackTarget: to })),
  setAttackSuccessful: (to) => set(() => ({ attackSuccessful: to })),
  setCombatPhase: (to) => set(() => ({ combatPhase: to })),
  setHitAmount: (to) => set(() => ({ hitAmount: to })),
});
