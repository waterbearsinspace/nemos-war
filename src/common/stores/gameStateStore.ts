// modules
import { create } from "zustand";

// interfaces
import { MotiveSliceInterface } from "./game-state-slices/motiveSlice";

// slices
import { motiveSlice } from "./game-state-slices/motiveSlice";

export const gameStateStore = create<MotiveSliceInterface>()((...a) => ({
  ...motiveSlice(...a),
}));
