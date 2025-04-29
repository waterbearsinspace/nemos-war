import { nemosStore } from "../../stores/nemosStore";
import { checkEndGame } from "./nemosCoreEndGame";

// ============================
// SHIP RESOURCES
// ============================

// adjust nemo value
export function adjustNemoBy(by: number) {
  const nemoValue = nemosStore.getState().nemo.value;
  const setNemoValue = nemosStore.getState().setNemoValue;
  const newNemoValue = nemoValue + by;
  const maxNemoValue = 6;

  if (newNemoValue > maxNemoValue) {
    setNemoValue(maxNemoValue);
  } else setNemoValue(nemoValue + by);

  checkEndGame("Nemo", newNemoValue);
}

// adjust crew value
export function adjustCrewBy(by: number) {
  const crewValue = nemosStore.getState().crew.value;
  const setCrewValue = nemosStore.getState().setCrewValue;
  const newCrewValue = crewValue + by;
  const maxCrewValue = 10;

  if (newCrewValue > maxCrewValue) {
    setCrewValue(maxCrewValue);
  } else setCrewValue(newCrewValue);

  checkEndGame("Crew", newCrewValue);
}

// adjust hull value
export function adjustHullBy(by: number) {
  const hullValue = nemosStore.getState().hull.value;
  const setHullValue = nemosStore.getState().setHullValue;
  const newHullValue = hullValue + by;
  const maxHullValue = 10;

  if (newHullValue > maxHullValue) {
    setHullValue(maxHullValue);
  } else setHullValue(newHullValue);

  checkEndGame("Hull", newHullValue);
}
