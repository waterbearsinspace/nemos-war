import { diceStore } from "../stores/diceStore";
import { nemosStore } from "../stores/nemosStore";
import { getFlippedShip, getSubPhaseNumber } from "../utils/utils";

// ============================
// UTILS
// ============================
export function setSubPhase(subPhase: string) {
  const setCurrentSubPhase = nemosStore.getState().setCurrentSubPhase;

  setCurrentSubPhase(getSubPhaseNumber(subPhase));
}

// ============================
// GAME END
// ============================
// check for end game by ship resources or notoriety
function checkEndGame() {
  const setGameLost = nemosStore.getState().setGameLost;
  function loseGame() {
    setGameLost(true);
    setSubPhase("GAME OVER");
    console.log("LOST");
  }

  // ship resources
  const nemoValue = nemosStore.getState().nemo.value;
  const crewValue = nemosStore.getState().crew.value;
  const hullValue = nemosStore.getState().hull.value;
  if (nemoValue <= 0 || crewValue <= 0 || hullValue <= 0) {
    loseGame();
  }

  // notoriety
  const motiveGameOver = nemosStore.getState().motiveGameOver;
  const notoriety = nemosStore.getState().notoriety;
  if (notoriety >= motiveGameOver) {
    loseGame();
  }
}

// ============================
// SHIP RESOURCES
// ============================
// adjust nemo value
function adjustNemoBy(by: number) {
  const nemoValue = nemosStore.getState().nemo.value;
  const setNemoValue = nemosStore.getState().setNemoValue;
  const newNemoValue = nemoValue + by;
  const maxNemoValue = 6;

  if (newNemoValue > maxNemoValue) {
    setNemoValue(maxNemoValue);
  } else setNemoValue(nemoValue + by);

  checkEndGame();
}

// adjust crew value
function adjustCrewBy(by: number) {
  const crewValue = nemosStore.getState().crew.value;
  const setCrewValue = nemosStore.getState().setCrewValue;
  const newCrewValue = crewValue + by;
  const maxCrewValue = 10;

  if (newCrewValue > maxCrewValue) {
    setCrewValue(maxCrewValue);
  } else setCrewValue(newCrewValue);

  checkEndGame();
}

// adjust hull value
function adjustHullBy(by: number) {
  const hullValue = nemosStore.getState().hull.value;
  const setHullValue = nemosStore.getState().setHullValue;
  const newHullValue = hullValue + by;
  const maxHullValue = 10;

  if (newHullValue > maxHullValue) {
    setHullValue(maxHullValue);
  } else setHullValue(newHullValue);

  checkEndGame();
}

// ============================
// NOTORIETY
// ============================
// check notoriety
function checkNotoriety() {
  const notorietyValue = nemosStore.getState().notoriety;
  const currentShipPool = nemosStore.getState().currentShipPool;
  const unusedShipPool = nemosStore.getState().unusedShipPool;
  const setCurrentShipPool = nemosStore.getState().setCurrentShipPool;
  const setUnusedShipPool = nemosStore.getState().setUnusedShipPool;

  // reinforcement group d
  const addReinforcementGroupDThreshhold = 14;
  const reinforcementGroupDAdded =
    nemosStore.getState().reinforcementGroupDAdded;
  const setReinforcementGroupDAdded =
    nemosStore.getState().setReinforcementGroupDAdded;
  const reinforcementGroupD = unusedShipPool.filter(
    (ship) => ship.groupId == "D" || ship.flipGroupId == "D"
  );
  const unusedShipPoolWithoutGroupD = unusedShipPool.filter(
    (ship) => ship.groupId != "D" || ship.flipGroupId != "D"
  );

  if (!reinforcementGroupDAdded) {
    if (notorietyValue >= addReinforcementGroupDThreshhold) {
      setCurrentShipPool(currentShipPool.concat(reinforcementGroupD));
      setUnusedShipPool(unusedShipPoolWithoutGroupD);
      setReinforcementGroupDAdded(true);
    }
  }

  // reinforcement group e
  const addReinforcementGroupEThreshhold = 26;
  const reinforcementGroupEAdded =
    nemosStore.getState().reinforcementGroupEAdded;
  const setReinforcementGroupEAdded =
    nemosStore.getState().setReinforcementGroupEAdded;
  const reinforcementGroupE = unusedShipPool.filter(
    (ship) => ship.groupId == "E" || ship.flipGroupId == "E"
  );
  const unusedShipPoolWithoutGroupE = unusedShipPool.filter(
    (ship) => ship.groupId != "E" || ship.flipGroupId != "E"
  );

  if (!reinforcementGroupEAdded) {
    if (notorietyValue >= addReinforcementGroupEThreshhold) {
      setCurrentShipPool(currentShipPool.concat(reinforcementGroupE));
      setUnusedShipPool(unusedShipPoolWithoutGroupE);
      setReinforcementGroupEAdded(true);
    }
  }

  // allied navies upgrade
  const alliedNavyUpgradeThreshold = 36;
  const warshipsFlipped = nemosStore.getState().warshipsFlipped;
  const setWarshipsFlipped = nemosStore.getState().setWarshipsFlipped;
  const flippedCurrentShipPool = currentShipPool.map((ship) => {
    if (
      ship.groupId != "A" &&
      ship.groupId != "J" &&
      ship.flipGroupId != "A" &&
      ship.flipGroupId != "J"
    ) {
      if (ship.flipped != true) {
        return getFlippedShip(ship);
      }
    }
    return ship;
  });
  const flippedUnusedShipPool = unusedShipPool.map((ship) => {
    if (
      ship.groupId != "A" &&
      ship.groupId != "J" &&
      ship.flipGroupId != "A" &&
      ship.flipGroupId != "J"
    ) {
      if (!ship.flipped) {
        return getFlippedShip(ship);
      }
    }
    return ship;
  });

  if (!warshipsFlipped) {
    if (notorietyValue >= alliedNavyUpgradeThreshold) {
      setCurrentShipPool(flippedCurrentShipPool);
      setUnusedShipPool(flippedUnusedShipPool);
      setWarshipsFlipped(true);
    }
  }

  // black placement die added
  const blackPlacementDieThreshold = 44;
  const blackPlacementDieAdded = nemosStore.getState().blackPlacementDieAdded;
  const setBlackPlacementDieAdded =
    nemosStore.getState().setBlackPlacementDieAdded;
  if (!blackPlacementDieAdded) {
    setBlackPlacementDieAdded(true);
  }
  const dice = diceStore.getState().dice;
  const setDice = diceStore.getState().setDice;
  const diceWithoutBlackDie = dice.filter((die) => die.id != "b2");
  const diceWithBlackDie = diceWithoutBlackDie.concat([
    {
      id: "b2",
      value: 1,
      placement: true,
    },
  ]);
  if (!blackPlacementDieAdded) {
    if (notorietyValue >= blackPlacementDieThreshold) {
      setDice(diceWithBlackDie);
    }
  }

  checkEndGame();
}

// adjust notoriety
function adjustNotorietyBy(by: number) {
  const notorietyValue = nemosStore.getState().notoriety;
  const setNotorietyValue = nemosStore.getState().setNotoriety;
  const newNotoriety = notorietyValue + by;
  const maxNotoriety = 51;

  if (newNotoriety > maxNotoriety) {
    setNotorietyValue(maxNotoriety);
  } else setNotorietyValue(newNotoriety);

  checkNotoriety();
  checkEndGame();
}

export const useNemosCore = () => {
  return {
    adjustNemoBy,
    adjustCrewBy,
    adjustHullBy,
    adjustNotorietyBy,
  };
};
