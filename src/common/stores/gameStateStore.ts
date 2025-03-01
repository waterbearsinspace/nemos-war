// modules
import { create } from "zustand";

// slices and interfaces
import {
  motiveSlice,
  MotiveSliceInterface,
} from "./game-state-slices/motiveSlice";
import {
  drawPileSlice,
  DrawPileSliceInterface,
} from "./game-state-slices/drawPileSlice";
import {
  adventureDeckSlice,
  AdventureDeckSliceInterface,
} from "./game-state-slices/adventureDeckSlice";

export const gameStateStore = create<
  MotiveSliceInterface & DrawPileSliceInterface & AdventureDeckSliceInterface
>()((...a) => ({
  ...motiveSlice(...a),
  ...drawPileSlice(...a),
  ...adventureDeckSlice(...a),
}));
