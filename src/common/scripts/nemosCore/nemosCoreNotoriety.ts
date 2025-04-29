import { diceStore } from "../../stores/diceStore";
import { nemosStore } from "../../stores/nemosStore";
import { checkEndGame } from "./nemosCoreEndGame";
import { getFlippedShip } from "./nemosCoreUtils";

// ============================
// NOTORIETY
// ============================

// check notoriety
function checkNotoriety(newNotoriety: number) {
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
  const reinforcementGroupD = unusedShipPool.filter((ship) => {
    return ship.groupId == "D" || ship.flipGroupId == "D";
  });
  const unusedShipPoolWithoutGroupD = unusedShipPool.filter((ship) => {
    return ship.groupId != "D" || ship.flipGroupId != "D";
  });

  if (!reinforcementGroupDAdded) {
    if (newNotoriety >= addReinforcementGroupDThreshhold) {
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
  const reinforcementGroupE = unusedShipPool.filter((ship) => {
    return ship.groupId == "E" || ship.flipGroupId == "E";
  });
  const unusedShipPoolWithoutGroupE = unusedShipPool.filter((ship) => {
    return ship.groupId != "E" || ship.flipGroupId != "E";
  });

  if (!reinforcementGroupEAdded) {
    if (newNotoriety >= addReinforcementGroupEThreshhold) {
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
    if (newNotoriety >= alliedNavyUpgradeThreshold) {
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
  const diceWithoutBlackDie = dice.filter((die) => {
    return die.id != "b2";
  });
  const diceWithBlackDie = diceWithoutBlackDie.concat([
    {
      id: "b2",
      value: 1,
      placement: true,
    },
  ]);
  if (!blackPlacementDieAdded) {
    if (newNotoriety >= blackPlacementDieThreshold) {
      setDice(diceWithBlackDie);
    }
  }

  checkEndGame("Notoriety", newNotoriety);
}

// adjust notoriety
export function adjustNotorietyBy(by: number) {
  const notorietyValue = nemosStore.getState().notoriety;
  const setNotorietyValue = nemosStore.getState().setNotoriety;
  const newNotoriety = notorietyValue + by;
  const maxNotoriety = 51;

  if (newNotoriety > maxNotoriety) {
    setNotorietyValue(maxNotoriety);
  } else setNotorietyValue(newNotoriety);

  checkNotoriety(newNotoriety);
  checkEndGame("Notoriety", newNotoriety);
}
