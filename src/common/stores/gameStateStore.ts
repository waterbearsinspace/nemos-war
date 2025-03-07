// modules
import { create } from "zustand";

// slices and interfaces
import {
  actionPointsSlice,
  ActionPointsSliceInterface,
} from "./game-state-slices/actionPointsSlice";
import {
  adventureDeckSlice,
  AdventureDeckSliceInterface,
} from "./game-state-slices/adventureDeckSlice";
import {
  characterResourceSlice,
  CharacterResourcesSliceInterface,
} from "./game-state-slices/characterResourcesSlice";
import {
  drawPileSlice,
  DrawPileSliceInterface,
} from "./game-state-slices/drawPileSlice";
import {
  keptCardsSlice,
  KeptCardsSliceInterface,
} from "./game-state-slices/keptCardsSlice";
import {
  motiveSlice,
  MotiveSliceInterface,
} from "./game-state-slices/motiveSlice";
import {
  shipResourceSlice,
  ShipResourcesSliceInterface,
} from "./game-state-slices/shipResourceSlice";
import {
  upgradesSlice,
  UpgradesSliceInterface,
} from "./game-state-slices/upgradesSlice";

// store
export const gameStateStore = create<
  ActionPointsSliceInterface &
    AdventureDeckSliceInterface &
    CharacterResourcesSliceInterface &
    DrawPileSliceInterface &
    KeptCardsSliceInterface &
    MotiveSliceInterface &
    ShipResourcesSliceInterface &
    UpgradesSliceInterface
>()((...a) => ({
  ...motiveSlice(...a),
  ...drawPileSlice(...a),
  ...adventureDeckSlice(...a),
  ...characterResourceSlice(...a),
  ...shipResourceSlice(...a),
  ...keptCardsSlice(...a),
  ...upgradesSlice(...a),
  ...actionPointsSlice(...a),
}));
