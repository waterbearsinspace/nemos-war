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
  sunkenShipsSlice,
  SunkenShipsSliceInterface,
} from "./game-state-slices/sunkenShipsSlice";
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
    SunkenShipsSliceInterface &
    UpgradesSliceInterface
>()((...a) => ({
  ...actionPointsSlice(...a),
  ...adventureDeckSlice(...a),
  ...characterResourceSlice(...a),
  ...drawPileSlice(...a),
  ...keptCardsSlice(...a),
  ...motiveSlice(...a),
  ...shipResourceSlice(...a),
  ...sunkenShipsSlice(...a),
  ...upgradesSlice(...a),
}));
