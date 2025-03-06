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
import {
  characterResourceSlice,
  CharacterResourcesSliceInterface,
} from "./game-state-slices/characterResourcesSlice";
import {
  shipResourceSlice,
  ShipResourcesSliceInterface,
} from "./game-state-slices/shipResourceSlice";

export const gameStateStore = create<
  MotiveSliceInterface &
    DrawPileSliceInterface &
    AdventureDeckSliceInterface &
    CharacterResourcesSliceInterface &
    ShipResourcesSliceInterface
>()((...a) => ({
  ...motiveSlice(...a),
  ...drawPileSlice(...a),
  ...adventureDeckSlice(...a),
  ...characterResourceSlice(...a),
  ...shipResourceSlice(...a),
}));
