// game store
import { nemosStore } from "../../common/stores/nemosStore";

// types and interfaces
import type { vp } from "./calculateVictoryPoints";
export type treasure = {
  id: number;
  type: string;
  name?: string;
  vp?: vp;
  amount?: number;
};

// utils
import { shuffleArray } from "../utils/utils";

export const useTreasure = (id: number) => {
  const setNemoValue = nemosStore((state) => state.setNemoValue);
  const setCrewValue = nemosStore((state) => state.setCrewValue);
  const setHullValue = nemosStore((state) => state.setHullValue);
  const adjustActionPoints = nemosStore(
    (state) => state.setCurrentActionPoints
  );
  const addToPossibleUpgrades = nemosStore(
    (state) => state.addToPossibleUpgrades
  );
  const setUnusedUpgrades = nemosStore((state) => state.setUnusedUpgrades);
  const unusedUpgrades = nemosStore((state) => state.unusedUpgrades);

  switch (id) {
    // 0-10: wonders

    // 11-16: retain
    case 11: {
      setNemoValue(1);
      break;
    }
    case 12: {
      setCrewValue(1);
      break;
    }
    case 13: {
      setHullValue(1);
      break;
    }
    case 14: {
      adjustActionPoints(1);
      break;
    }
    case 15: {
      // gain 1 re-roll
      break;
    }
    case 16: {
      setUnusedUpgrades(shuffleArray(unusedUpgrades));
      addToPossibleUpgrades(unusedUpgrades[0]);
      break;
    }

    // 17-21: discard
    case 17: {
      // gain two treasure tokens
      break;
    }
    case 18: {
      // lose 1 resource or character
      break;
    }
    case 19: {
      // gain 2 notoriety
      break;
    }
    case 20: {
      // gain 3 notoriety
      break;
    }
    case 21: {
      // place 1 uprising cube
      break;
    }

    // 22-27: vp

    // invalidId
    default: {
      break;
    }
  }
};
