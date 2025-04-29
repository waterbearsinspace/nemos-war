import { diceStore } from "../../stores/diceStore";
import { nemosStore } from "../../stores/nemosStore";
import {
  adjustCrewBy,
  adjustHullBy,
  adjustNemoBy,
} from "./nemosCoreShipResources";

// ============================
// DICE
// ============================

const exertingNemo = diceStore.getState().exertingNemo;
const exertingCrew = diceStore.getState().exertingCrew;
const exertingHull = diceStore.getState().exertingHull;
const nemoExertionValue =
  nemosStore.getState().nemo.exertionDRM[nemosStore.getState().nemo.value];
const crewExertionValue =
  nemosStore.getState().crew.exertionDRM[nemosStore.getState().crew.value];
const hullExertionValue =
  nemosStore.getState().hull.exertionDRM[nemosStore.getState().hull.value];

export const exertionDRM =
  (exertingNemo ? nemoExertionValue : 0) +
  (exertingCrew ? crewExertionValue : 0) +
  (exertingHull ? hullExertionValue : 0);

export function applyFailedTestPenalty() {
  const testDiceNames = ["w1", "w2"];
  const dice = diceStore.getState().dice;
  const testDice = dice.filter((die) => {
    return testDiceNames.includes(die.id);
  });
  const dieValues = testDice.map((die) => {
    return die.value;
  });

  const lowestDieValue = Math.min(...dieValues);

  const exertingNemo = diceStore.getState().exertingNemo;
  const exertingCrew = diceStore.getState().exertingCrew;
  const exertingHull = diceStore.getState().exertingHull;

  if (lowestDieValue == 1) {
    if (exertingNemo) adjustNemoBy(-1);
    if (exertingCrew) adjustCrewBy(-1);
    if (exertingHull) adjustHullBy(-1);
  } else {
    if (exertingNemo) adjustNemoBy(-2);
    if (exertingCrew) adjustCrewBy(-2);
    if (exertingHull) adjustHullBy(-2);
  }
}
