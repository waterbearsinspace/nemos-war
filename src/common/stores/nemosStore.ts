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
import { combatSlice, CombatSliceInterface } from "./slices/combatSlice";
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
  passAndFailePileSlice,
  PassAndFailePileSliceInterface,
} from "./slices/passAndFailPilesSlice";

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
import { utilitySlice, UtilitySliceInterface } from "./slices/utilitySlice";
// store
export const nemosStore = create<
  ActionPointsSliceInterface &
    AdventureDeckSliceInterface &
    CharacterResourcesSliceInterface &
    CombatSliceInterface &
    DrawPileSliceInterface &
    GamePhaseSliceInterface &
    KeptCardsSliceInterface &
    MotiveSliceInterface &
    NotorietySliceInterface &
    OceanSliceInterface &
    PassAndFailePileSliceInterface &
    ShipPoolsSliceInterface &
    ShipResourcesSliceInterface &
    SunkenShipsSliceInterface &
    TreasuresSliceInterface &
    UpgradesSliceInterface &
    UtilitySliceInterface
>()((...a) => ({
  ...actionPointsSlice(...a),
  ...adventureDeckSlice(...a),
  ...characterResourceSlice(...a),
  ...combatSlice(...a),
  ...drawPileSlice(...a),
  ...gamePhaseSlice(...a),
  ...keptCardsSlice(...a),
  ...motiveSlice(...a),
  ...notorietySlice(...a),
  ...oceanSlice(...a),
  ...passAndFailePileSlice(...a),
  ...shipPoolsSlice(...a),
  ...shipResourceSlice(...a),
  ...sunkenShipsSlice(...a),
  ...treasuresSlice(...a),
  ...upgradesSlice(...a),
  ...utilitySlice(...a),
}));
