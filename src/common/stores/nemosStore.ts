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
  gamePhaseSlice,
  GamePhaseSliceInterface,
} from "./slices/gamePhaseSlice";
import {
  keptCardsSlice,
  KeptCardsSliceInterface,
} from "./slices/keptCardsSlice";
import { motiveSlice, MotiveSliceInterface } from "./slices/motiveSlice";
import { oceanSlice, OceanSliceInterface } from "./slices/oceanSlice";
import {
  shipPoolsSlice,
  ShipPoolsSliceInterface,
} from "./slices/shipPoolsSlice";
import {
  shipResourceSlice,
  ShipResourcesSliceInterface,
} from "./slices/shipResourceSlice";
import {
  sunkenShipsSlice,
  SunkenShipsSliceInterface,
} from "./slices/sunkenShipsSlice";
import { upgradesSlice, UpgradesSliceInterface } from "./slices/upgradesSlice";

import { debugSlice, DebugSliceInterface } from "./slices/debugSlice";

// store
export const nemosStore = create<
  ActionPointsSliceInterface &
    AdventureDeckSliceInterface &
    CharacterResourcesSliceInterface &
    DrawPileSliceInterface &
    GamePhaseSliceInterface &
    KeptCardsSliceInterface &
    MotiveSliceInterface &
    OceanSliceInterface &
    ShipPoolsSliceInterface &
    ShipResourcesSliceInterface &
    SunkenShipsSliceInterface &
    UpgradesSliceInterface &
    DebugSliceInterface
>()((...a) => ({
  ...actionPointsSlice(...a),
  ...adventureDeckSlice(...a),
  ...characterResourceSlice(...a),
  ...drawPileSlice(...a),
  ...gamePhaseSlice(...a),
  ...keptCardsSlice(...a),
  ...motiveSlice(...a),
  ...oceanSlice(...a),
  ...shipPoolsSlice(...a),
  ...shipResourceSlice(...a),
  ...sunkenShipsSlice(...a),
  ...upgradesSlice(...a),
  ...debugSlice(...a),
}));
