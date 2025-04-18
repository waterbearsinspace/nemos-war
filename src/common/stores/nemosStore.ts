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
import {
  notorietySlice,
  NotorietySliceInterface,
} from "./slices/notorietySlice";
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
import {
  treasuresSlice,
  TreasuresSliceInterface,
} from "./slices/treasuresSlice";
import { upgradesSlice, UpgradesSliceInterface } from "./slices/upgradesSlice";

// store
export const nemosStore = create<
  ActionPointsSliceInterface &
    AdventureDeckSliceInterface &
    CharacterResourcesSliceInterface &
    DrawPileSliceInterface &
    GamePhaseSliceInterface &
    KeptCardsSliceInterface &
    MotiveSliceInterface &
    NotorietySliceInterface &
    OceanSliceInterface &
    ShipPoolsSliceInterface &
    ShipResourcesSliceInterface &
    SunkenShipsSliceInterface &
    TreasuresSliceInterface &
    UpgradesSliceInterface
>()((...a) => ({
  ...actionPointsSlice(...a),
  ...adventureDeckSlice(...a),
  ...characterResourceSlice(...a),
  ...drawPileSlice(...a),
  ...gamePhaseSlice(...a),
  ...keptCardsSlice(...a),
  ...motiveSlice(...a),
  ...notorietySlice(...a),
  ...oceanSlice(...a),
  ...shipPoolsSlice(...a),
  ...shipResourceSlice(...a),
  ...sunkenShipsSlice(...a),
  ...treasuresSlice(...a),
  ...upgradesSlice(...a),
}));
