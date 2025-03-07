// modules
import { create } from "zustand";

// slices and interfaces
import {
  actionPointsSlice,
  ActionPointsSliceInterface,
} from "./slices/actionPointsSlice";
import {
  adventureDeckSlice,
  AdventureDeckSliceInterface,
} from "./slices/adventureDeckSlice";
import {
  characterResourceSlice,
  CharacterResourcesSliceInterface,
} from "./slices/characterResourcesSlice";
import { drawPileSlice, DrawPileSliceInterface } from "./slices/drawPileSlice";
import {
  keptCardsSlice,
  KeptCardsSliceInterface,
} from "./slices/keptCardsSlice";
import { motiveSlice, MotiveSliceInterface } from "./slices/motiveSlice";
import {
  shipResourceSlice,
  ShipResourcesSliceInterface,
} from "./slices/shipResourceSlice";
import {
  sunkenShipsSlice,
  SunkenShipsSliceInterface,
} from "./slices/sunkenShipsSlice";
import { upgradesSlice, UpgradesSliceInterface } from "./slices/upgradesSlice";

// store
export const nemosStore = create<
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
