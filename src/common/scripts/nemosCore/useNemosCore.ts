import { addSalvage, addTonnage, updateAttackOptions } from "./nemosCoreCombat";
import { applyFailedTestPenalty, exertionDRM } from "./nemosCoreDice";
import { setSubPhase } from "./nemosCoreGamePhase";
import { handleMovementScreenOptions, moveNautilus } from "./nemosCoreMovement";
import { adjustNotorietyBy } from "./nemosCoreNotoriety";
import {
  revealHiddenShipInOcean,
  setShipAsAttackTarget,
} from "./nemosCoreOceansShips";
import { failCard, passCard } from "./nemosCorePassAndFailPiles";
import {
  handlePlacementDieClick,
  handlePlacementOptionClick,
} from "./nemosCorePlacement";
import { resetCombat, resetResolving } from "./nemosCoreResets";
import { getScore, getTotalScore } from "./nemosCoreScore";
import {
  adjustCrewBy,
  adjustHullBy,
  adjustNemoBy,
} from "./nemosCoreShipResources";
import { gainXTreasures, useTreasure } from "./nemosCoreTreasure";

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

    // pass and fail piles
    passCard,
    failCard,

    // resets
    resetCombat,
    resetResolving,

    // ship resources
    adjustNemoBy,
    adjustCrewBy,
    adjustHullBy,

    // score
    getScore,
    getTotalScore,

    // sunkenShips
    addTonnage,
    addSalvage,

    // treasure
    gainXTreasures,
    useTreasure,
  };
};
