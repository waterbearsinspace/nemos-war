import { nemosStore } from "../../stores/nemosStore";
import { resetCombat, resetMovement } from "./nemosCoreResets";
import { getSubPhaseNumber } from "./nemosCoreUtils";

// ============================
// GAME PHASE
// ============================

export function setSubPhase(subPhase: string | number) {
  const currentSubPhase = nemosStore.getState().currentSubPhase;
  const setPreviousSubPhase = nemosStore.getState().setPreviousSubPhase;
  const setCurrentSubPhase = nemosStore.getState().setCurrentSubPhase;
  const gameLost = nemosStore.getState().gameLost;

  setPreviousSubPhase(currentSubPhase as number);

  resetMovement();
  resetCombat();

  if (gameLost) {
    setCurrentSubPhase(getSubPhaseNumber("GAME OVER"));
  } else if (typeof subPhase == "string") {
    setCurrentSubPhase(getSubPhaseNumber(subPhase));
  } else {
    setCurrentSubPhase(subPhase);
  }
}

export function adjustActionPointsBy(by: number) {
  const actionPointsCurrent = nemosStore.getState().actionPointsCurrent;
  const setActionPointsCurrent = nemosStore.getState().setActionPointsCurrent;

  setActionPointsCurrent(actionPointsCurrent + by);
}
