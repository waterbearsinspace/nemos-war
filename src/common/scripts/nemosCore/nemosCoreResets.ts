import { diceStore } from "../../stores/diceStore";
import { nemosStore } from "../../stores/nemosStore";

// ============================
// GENERAL
// ============================

export function resetResolving() {
  const setResolving = nemosStore.getState().setResolving;
  const setResolvingSelected = nemosStore.getState().setResolvingSelected;

  setResolving(false);
  setResolvingSelected([]);
}

// ============================
// COMBAT
// ============================

export function resetCombat() {
  const setDoneDefending = nemosStore.getState().setDoneDefending;
  const setDoneAttacking = nemosStore.getState().setDoneAttacking;
  const setAttackSuccessful = nemosStore.getState().setAttackSuccessful;
  const setCombatPhase = nemosStore.getState().setCombatPhase;
  const setAttackTarget = nemosStore.getState().setAttackTarget;
  const setHitAmount = nemosStore.getState().setHitAmount;
  const setAttackType = nemosStore.getState().setAttackType;

  setDoneDefending(false);
  setDoneAttacking(false);
  setAttackSuccessful(false);
  setCombatPhase("");
  setAttackTarget(null);
  setHitAmount(null);
  setAttackType(null);

  resetAttackOptions();
  resetResolving();
  resetRolls();
}

export function resetAttackOptions() {
  const setOceanClickType = nemosStore.getState().setOceanClickType;
  const setOceanClickOptions = nemosStore.getState().setOceanClickOptions;
  setOceanClickType("");
  setOceanClickOptions([]);
}

// ============================
// DICE
// ============================

export function resetRolls() {
  const setExertingNemo = diceStore.getState().setExertingNemo;
  const setExertingCrew = diceStore.getState().setExertingCrew;
  const setExertingHull = diceStore.getState().setExertingHull;
  const setDoneRolling = diceStore.getState().setDoneRolling;

  setExertingNemo(false);
  setExertingCrew(false);
  setExertingHull(false);
  setDoneRolling(false);
}

// ============================
// MOVEMENT
// ============================

export function resetMovement() {
  const setNautilusMoved = nemosStore.getState().setNautilusMoved;
  const setHydroMoved = nemosStore.getState().setHydroMoved;

  setNautilusMoved(false);
  setHydroMoved(false);
}

// ============================
// PLACEMENT
// ============================

export function resetPlacement() {
  const setOceanClickType = nemosStore.getState().setOceanClickType;
  const setClickedOcean = nemosStore.getState().setClickedOcean;
  const setOceanClickOptions = nemosStore.getState().setOceanClickOptions;

  setClickedOcean(null);
  setOceanClickType("");
  setOceanClickOptions([]);
}
