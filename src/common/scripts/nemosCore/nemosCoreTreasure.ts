import { diceStore } from "../../stores/diceStore";
import { nemosStore } from "../../stores/nemosStore";
import { adjustActionPointsBy } from "./nemosCoreGamePhase";
import {
  adjustCrewBy,
  adjustHullBy,
  adjustNemoBy,
} from "./nemosCoreShipResources";
import { shuffleArray } from "./nemosCoreUtils";

export function gainXTreasures(amount: number) {
  const treasureDrawPool = nemosStore.getState().treasureDrawPool;
  const setTreasureDrawPool = nemosStore.getState().setTreasureDrawPool;
  const setCurrentTreasures = nemosStore.getState().setCurrentTreasures;
  const currentTreasures = nemosStore.getState().currentTreasures;

  const shuffledTreasures = shuffleArray(treasureDrawPool);

  let drawnTreasures = [];

  for (let i = 0; i < amount; i++) {
    const drawnTreasure = shuffledTreasures[i];
    drawnTreasures.push(drawnTreasure);
  }

  setCurrentTreasures(currentTreasures.concat(drawnTreasures));
  setTreasureDrawPool(
    treasureDrawPool.filter((treasure) => {
      return drawnTreasures.includes(treasure);
    })
  );
}

export function useTreasure(id: number) {
  // const addToPossibleUpgrades = nemosStore(
  //   (state) => state.addToPossibleUpgrades
  // );
  // const setUnusedUpgrades = nemosStore((state) => state.setUnusedUpgrades);
  // const unusedUpgrades = nemosStore((state) => state.unusedUpgrades);

  const setDoneRolling = diceStore.getState().setDoneRolling;
  const setCurrentTreasures = nemosStore.getState().setCurrentTreasures;
  const currentTreasures = nemosStore.getState().currentTreasures;

  switch (id) {
    // 11-23: retain
    case 11:
    case 12: {
      adjustNemoBy(1);
      break;
    }
    case 13: {
      adjustCrewBy(1);
      break;
    }
    case 14: {
      adjustHullBy(1);
      break;
    }
    case 15:
    case 16:
    case 17:
    case 18: {
      adjustActionPointsBy(1);
      break;
    }
    case 19:
    case 20:
    case 21:
    case 22: {
      setDoneRolling(false);
      break;
    }
    case 16: {
      // setUnusedUpgrades(shuffleArray(unusedUpgrades));
      // addToPossibleUpgrades(unusedUpgrades[0]);
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

  // remove from treasures
  setCurrentTreasures(
    currentTreasures.filter((treasure) => {
      return treasure.id != id;
    })
  );
}
