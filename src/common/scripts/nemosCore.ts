import { diceStore } from "../stores/diceStore";
import { nemosStore } from "../stores/nemosStore";
import { getFlippedShip, setSubPhase } from "../utils/utils";

// ============================
// GAME END
// ============================
// check for end game by ship resources or notoriety
function checkEndGame() {
  const setGameLost = nemosStore((state) => state.setGameLost);
  function loseGame() {
    setGameLost(true);
    setSubPhase("GAME OVER");
  }

  // ship resources
  const nemoValue = nemosStore((state) => state.nemo.value);
  const crewValue = nemosStore((state) => state.crew.value);
  const hullValue = nemosStore((state) => state.hull.value);
  if (nemoValue <= 0 || crewValue <= 0 || hullValue <= 0) {
    loseGame();
  }

  // notoriety
  const motiveGameOver = nemosStore((state) => state.motiveGameOver);
  const notoriety = nemosStore((state) => state.notoriety);
  if (notoriety >= motiveGameOver) {
    loseGame();
  }
}

// ============================
// SHIP RESOURCES
// ============================

// adjust nemo value
function adjustNemoBy(by: number) {
  const nemoValue = nemosStore((state) => state.nemo.value);
  const setNemoValue = nemosStore((state) => state.setHullValue);
  const newNemoValue = nemoValue + by;
  const maxNemoValue = 6;

  if (newNemoValue > maxNemoValue) {
    setNemoValue(maxNemoValue);
  } else setNemoValue(newNemoValue);

  checkEndGame();
}

// adjust crew value
function adjustCrewBy(by: number) {
  const crewValue = nemosStore((state) => state.crew.value);
  const setCrewValue = nemosStore((state) => state.setCrewValue);
  const newCrewValue = crewValue + by;
  const maxCrewValue = 10;

  if (newCrewValue > maxCrewValue) {
    setCrewValue(maxCrewValue);
  } else setCrewValue(newCrewValue);

  checkEndGame();
}

// adjust hull value
function adjustHullBy(by: number) {
  const hullValue = nemosStore((state) => state.nemo.value);
  const setHullValue = nemosStore((state) => state.setHullValue);
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
// adjust notoriety
function adjustNotorietyBy(by: number) {
  const notorietyValue = nemosStore((state) => state.notoriety);
  const setNotorietyValue = nemosStore((state) => state.setNotoriety);
  const newNotoriety = notorietyValue + by;
  const maxNotoriety = 51;

  if (newNotoriety > maxNotoriety) {
    setNotorietyValue(maxNotoriety);
  } else setNotorietyValue(newNotoriety);

  checkEndGame();
}

function checkNotoriety() {
  const notorietyValue = nemosStore((state) => state.notoriety);
  const currentShipPool = nemosStore((state) => state.currentShipPool);
  const unusedShipPool = nemosStore((state) => state.unusedShipPool);
  const setCurrentShipPool = nemosStore((state) => state.setCurrentShipPool);
  const setUnusedShipPool = nemosStore((state) => state.setUnusedShipPool);

  // reinforcement group d
  const addReinforcementGroupDThreshhold = 14;
  const reinforcementGroupDAdded = nemosStore(
    (state) => state.reinforcementGroupDAdded
  );
  const setReinforcementGroupDAdded = nemosStore(
    (state) => state.setReinforcementGroupDAdded
  );
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
  const reinforcementGroupEAdded = nemosStore(
    (state) => state.reinforcementGroupEAdded
  );
  const setReinforcementGroupEAdded = nemosStore(
    (state) => state.setReinforcementGroupEAdded
  );
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
  const warshipsFlipped = nemosStore((state) => state.warshipsFlipped);
  const setWarshipsFlipped = nemosStore((state) => state.setWarshipsFlipped);
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
  const blackPlacementDieAdded = nemosStore(
    (state) => state.blackPlacementDieAdded
  );
  const setBlackPlacementDieAdded = nemosStore(
    (state) => state.setBlackPlacementDieAdded
  );
  if (!blackPlacementDieAdded) {
    setBlackPlacementDieAdded(true);
  }
  const dice = diceStore((state) => state.dice);
  const setDice = diceStore((state) => state.setDice);
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

// ============================
// SHIPS
// ============================
// flip ship
