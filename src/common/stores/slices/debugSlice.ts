// modules
import { StateCreator } from "zustand";

export interface DebugSliceInterface {
  debugLoading: number;
  debugUseLoading: boolean;
  debugSubPhase: number;
  debugUseSubPhase: boolean;
}

// slice
export const debugSlice: StateCreator<DebugSliceInterface, []> = () => ({
  debugLoading: 0,
  debugUseLoading: true,
  debugSubPhase: 3,
  debugUseSubPhase: false,
});

// setup subphases
// 0: motive
// 1: draw pile and adventure deck
// 2: starting upgrade
// 3: ship pools
