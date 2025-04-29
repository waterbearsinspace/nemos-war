import { addSalvage, addTonnage, updateAttackOptions } from "./nemosCoreCombat";
import { applyFailedTestPenalty, exertionDRM } from "./nemosCoreDice";
import { setSubPhase } from "./nemosCoreGamePhase";
import { handleMovementScreenOptions, moveNautilus } from "./nemosCoreMovement";
import { adjustNotorietyBy } from "./nemosCoreNotoriety";
import {
  revealHiddenShipInOcean,
  setShipAsAttackTarget,
} from "./nemosCoreOceansShips";
import {
  handlePlacementDieClick,
  handlePlacementOptionClick,
} from "./nemosCorePlacement";
import { resetCombat, resetResolving } from "./nemosCoreResets";
import {
  adjustCrewBy,
  adjustHullBy,
  adjustNemoBy,
} from "./nemosCoreShipResources";

export const useNemosCore = () => {
  return {
    // combat
    updateAttackOptions,

    // dice
    applyFailedTestPenalty,
    exertionDRM,

    // game phase
    setSubPhase,

    // movement
    handleMovementScreenOptions,
    moveNautilus,

    // notoriety
    adjustNotorietyBy,

    // oceans ships
    revealHiddenShipInOcean,
    selectShipInOcean: setShipAsAttackTarget,

    // placement
    handlePlacementDieClick,
    handlePlacementOptionClick,

    // resets
    resetCombat,
    resetResolving,

    // ship resources
    adjustNemoBy,
    adjustCrewBy,
    adjustHullBy,

    // sunkenShips
    addTonnage,
    addSalvage,
  };
};
