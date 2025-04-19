import { diceStore } from "../stores/diceStore";
import { nemosStore } from "../stores/nemosStore";
import { ocean } from "../stores/slices/oceanSlice";
import { ship } from "../stores/slices/shipPoolsSlice";
import { getFlippedShip, getSubPhaseNumber } from "./utils/utils";

// ============================
// UTILS
// ============================
function setSubPhase(subPhase: string) {
  const setCurrentSubPhase = nemosStore.getState().setCurrentSubPhase;

  setCurrentSubPhase(getSubPhaseNumber(subPhase));
}

// ============================
// GAME END
// ============================
// check for end game by ship resources or notoriety
function loseGame(message: string) {
  const setGameLost = nemosStore.getState().setGameLost;
  const setGameLostMessage = nemosStore.getState().setGameLostMessage;

  setGameLost(true);
  setGameLostMessage(message);
  setSubPhase("GAME OVER");
}

function checkEndGame() {
  // ship resources
  const nemoValue = nemosStore.getState().nemo.value;
  const crewValue = nemosStore.getState().crew.value;
  const hullValue = nemosStore.getState().hull.value;
  if (nemoValue <= 0) {
    loseGame("You reached 0 Nemo!");
  }
  if (crewValue <= 0) {
    loseGame("You reached 0 Crew!");
  }
  if (hullValue <= 0) {
    loseGame("You reached 0 Hull!");
  }

  // notoriety
  const motiveGameOver = nemosStore.getState().currentMotive.gameOver;
  const notoriety = nemosStore.getState().notoriety;
  if (notoriety >= motiveGameOver) {
    loseGame("You gained too much Notoriety!");
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
  const reinforcementGroupD = unusedShipPool.filter((ship) => {
    return ship.groupId == "D" || ship.flipGroupId == "D";
  });
  const unusedShipPoolWithoutGroupD = unusedShipPool.filter((ship) => {
    return ship.groupId != "D" || ship.flipGroupId != "D";
  });

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
  const reinforcementGroupE = unusedShipPool.filter((ship) => {
    return ship.groupId == "E" || ship.flipGroupId == "E";
  });
  const unusedShipPoolWithoutGroupE = unusedShipPool.filter((ship) => {
    return ship.groupId != "E" || ship.flipGroupId != "E";
  });

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

// ============================
// DICE
// ============================
function getTestDiceResult() {
  const testDiceNames = ["w1", "w2"];
  const testDice = diceStore((state) =>
    state.dice.filter((die) => {
      return testDiceNames.includes(die.id);
    })
  );
  const result = testDice.reduce((sum, die) => sum + die.value, 0);

  return result;
}

// ============================
// SHIPS
// ============================
function drawShip() {
  const shipPool = nemosStore.getState().currentShipPool;
  const setShipPool = nemosStore.getState().setCurrentShipPool;

  // draw ship
  const drawnShip = shipPool[0];

  // remove drawn ship from ship pool
  const newShipPool = shipPool.filter((ship, index) => {
    return index != 0;
  });
  setShipPool(newShipPool);

  // return drawn ship
  return drawnShip;
}

// ============================
// PLACEMENT
// ============================
// handle click of a placement die
function handlePlacementDieClick(value: number) {
  const setPlacementType = nemosStore.getState().setPlacementType;
  const setPlacementOcean = nemosStore.getState().setPlacementOcean;
  const setPlacementOptions = nemosStore.getState().setPlacementOptions;

  // all oceans
  const oceans = nemosStore.getState().oceans;
  // placement ocean
  const placementOcean = oceans.find((ocean) => {
    return ocean.dieValue == value;
  })!;
  // placement ocean ships
  const placementOceanShips = placementOcean?.ships;
  // placement ocean is not full
  const placementOceanNotFull = placementOceanShips
    ? placementOceanShips.length < placementOcean.maxShips
    : null;
  // placement ocean has hidden ships
  const placementOceanHasHiddenShip = placementOceanShips?.some((ship) => {
    return typeof ship == "string";
  });
  // placement ocean has non warship
  const placementOceanHasNonWarship = placementOceanShips?.some((ship) => {
    if (typeof ship != "string") {
      return ship.groupId == "A";
    }
  });
  // non warships in placement ocean
  let nonWarshipsInPlacementOcean: ship[] = [];
  placementOceanShips.forEach((ship) => {
    if (typeof ship != "string") {
      if (ship.groupId == "A") {
        nonWarshipsInPlacementOcean.push(ship);
      }
    }
  });
  // names of adjacent oceans
  const adjacentOceanNames = placementOcean?.adjacentOceans.map((ocean) => {
    return ocean.name;
  });
  // adjacent oceans
  const adjacentOceans = oceans.filter((ocean) => {
    {
      return adjacentOceanNames.includes(ocean.name);
    }
  });
  // adjacent oceans have are not full
  const adjacentOceansNotFull = adjacentOceans.some((ocean) => {
    return ocean.ships.length < ocean.maxShips;
  });
  // adjacent oceans have a hidden ship
  const adjacentOceansHaveHiddenShip = adjacentOceans.some((ocean) => {
    return ocean.ships.find((ship) => typeof ship == "string");
  });
  // adjacent oceans have a non warship
  const adjacentOceansHaveNonWarship = adjacentOceans.some((ocean) =>
    ocean.ships.some((ship) => {
      if (typeof ship != "string") {
        return ship.groupId == "A";
      }
    })
  );
  // adjacent oceans that are not full
  const adjacentOceansThatAreNotFull = adjacentOceans.filter((ocean) => {
    {
      return ocean.ships.length < ocean.maxShips;
    }
  });
  // adjacent oceans that have a hidden ship
  const adjacentOceansThatHaveAHiddenShip = adjacentOceans.filter((ocean) => {
    return ocean.ships.includes("Hidden Ship");
  });
  // adjacent oceans that have a non warship
  const adjacentOceansThatHaveANonWarship = adjacentOceans.filter((ocean) => {
    return ocean.ships.some((ship) => {
      if (typeof ship != "string") {
        return ship.groupId == "A";
      }
    });
  });
  // non warships in adjacent oceans
  let nonWarshipsInAdjacentOceans: ship[] = [];
  adjacentOceansThatHaveANonWarship.forEach((ocean) => {
    ocean.ships.forEach((ship) => {
      if (typeof ship != "string") {
        if (ship.groupId == "A") {
          nonWarshipsInAdjacentOceans.push(ship);
        }
      }
    });
  });
  // non empty oceans
  const nonEmptyOceans = oceans.filter((ocean) => {
    return ocean.ships.length < ocean.maxShips;
  });
  const existsNonEmptyOceans = nonEmptyOceans.length > 0;

  // set placement ocean, placement type, and placement options
  // set to Place Hidden if ocean is empty - hidden ship in ocean
  setPlacementOcean(placementOcean);
  if (placementOceanNotFull) {
    setPlacementType("Place Hidden");
    const setOceans = nemosStore.getState().setOceans;
    const newShips = placementOceanShips!.concat("Hidden Ship");
    setOceans(
      oceans.map((ocean) => {
        return ocean == placementOcean
          ? { ...placementOcean, ships: newShips }
          : ocean;
      })
    );
    setPlacementType("");
    setPlacementOcean(null);
  }
  // else Spread Out if ocean is full and adjacent oceans are not full - hidden ship in adjacent ocean
  else if (!placementOceanNotFull && adjacentOceansNotFull) {
    setPlacementType("Spread Out");
    // highlight adjacent oceans that are not full
    setPlacementOptions(adjacentOceansThatAreNotFull);
  }
  // else Reveal if ocean is full and adjacent oceans are full there is a hidden ship revealable in any - reveal hidden ship
  else if (
    !placementOceanNotFull &&
    !adjacentOceansNotFull &&
    (placementOceanHasHiddenShip || adjacentOceansHaveHiddenShip)
  ) {
    setPlacementType("Reveal");
    // highlight adjacent oceans that have a hidden ship
    setPlacementOptions(
      adjacentOceansThatHaveAHiddenShip.concat(
        placementOceanHasHiddenShip ? [placementOcean] : []
      )
    );
  }
  // else Get Hostile if ocean is full and adjacent oceans are full and there are no hidden ships but there is a nonwarship in any - flip nonwarship
  else if (
    !placementOceanNotFull &&
    !adjacentOceansNotFull &&
    !placementOceanHasHiddenShip &&
    !adjacentOceansHaveHiddenShip &&
    (placementOceanHasNonWarship || adjacentOceansHaveNonWarship)
  ) {
    setPlacementType("Get Hostile");
    // highlight white ships in ocean and adjacent oceans
    setPlacementOptions(
      nonWarshipsInPlacementOcean.concat(nonWarshipsInAdjacentOceans)
    );
  }
  // else Go Hunting if ocean is full and adjacent oceans are full and there are no nonwarships in any - place warship in any available ocean
  else if (
    !placementOceanNotFull &&
    !adjacentOceansNotFull &&
    !placementOceanHasHiddenShip &&
    !adjacentOceansHaveHiddenShip &&
    !placementOceanHasNonWarship &&
    !adjacentOceansHaveNonWarship &&
    existsNonEmptyOceans
  ) {
    setPlacementType("Go Hunting");
    // highlight non full oceans
    setPlacementOptions(nonEmptyOceans);
  }
  // else lose the game
  else {
    loseGame(
      "There was no more room in all the Oecans for an additional Warship!"
    );
  }
}

function handlePlacementOptionClick(option: ocean | ship) {
  const oceans = nemosStore.getState().oceans;
  const placementType = nemosStore.getState().placementType;
  const oceanOption = option as ocean;

  const setOceans = nemosStore.getState().setOceans;
  const setPlacementType = nemosStore.getState().setPlacementType;
  const setPlacementOcean = nemosStore.getState().setPlacementOcean;
  const setPlacementOptions = nemosStore.getState().setPlacementOptions;

  const setAttackingPlacedShip = nemosStore.getState().setAttackingPlacedShip;

  // set placement type none
  function resetPlacement() {
    setPlacementOcean(null);
    setPlacementType("");
    setPlacementOptions([]);
  }

  // select option
  // if Place Hidden
  if (placementType == "Place Hidden") {
    // do nothing, handled in die click
  }
  // if Spread Out
  if (placementType == "Spread Out") {
    // on clicking ocean, place hidden ship
    const newShips = oceanOption.ships.concat("Hidden Ship");
    const newOcean = { ...oceanOption, ships: newShips };
    const newOceans = oceans.map((ocean) => {
      return ocean == oceanOption ? newOcean : ocean;
    });
    setOceans(newOceans);
    resetPlacement();
  }
  // if Reveal
  if (placementType == "Reveal") {
    // on clicking ocean, reveal hidden ship
    // ships of ocean option
    const oceanOptionsShips = oceanOption.ships;
    // index of hidden ship
    const indexOfHiddenShip = oceanOptionsShips.indexOf("Hidden Ship");
    // new array of ships with hidden ship reveald
    const newShips = oceanOptionsShips.map((ship, index) => {
      return index == indexOfHiddenShip ? drawShip() : ship;
    });
    // update oceans
    const originalOcean = oceans.find((ocean) => ocean == oceanOption)!;
    const newOcean = { ...originalOcean, ships: newShips };
    const newOceans = oceans.map((ocean) => {
      return ocean == oceanOption ? newOcean : ocean;
    });
    setOceans(newOceans);
    resetPlacement();
  }
  // if Get Hostile
  if (placementType == "Get Hostile") {
    // on clicking ship, flip ship
    // ocean containing ship
    const containingOcean = oceans.filter((ocean) => {
      return ocean.ships.find((ship) => {
        if (typeof ship != "string") {
          return ship == option;
        }
      });
    })[0];
    // index of ship in ocean
    const optionIndex = containingOcean.ships.indexOf(option as ship);
    const newShips = containingOcean.ships.map((ship, index) => {
      if (typeof ship != "string") {
        return index == optionIndex ? getFlippedShip(option as ship) : ship;
      }
    });
    // update oceans
    const newOceans = oceans.map((ocean) => {
      return ocean == containingOcean
        ? { ...containingOcean, ships: newShips as ship[] }
        : ocean;
    });
    setOceans(newOceans);
    resetPlacement();
    // battle if placed in same ocean as nautilus
    setAttackingPlacedShip(option as ship);
  }
  // if Go Hunting
  if (placementType == "Go Hunting") {
    // on clicking ocean, place warship
    const optionOcean = option as ocean;
    const newShips = optionOcean.ships.concat("Hidden Ship");
    setOceans(
      oceans.map((ocean) => {
        return ocean == optionOcean
          ? { ...optionOcean, ships: newShips }
          : ocean;
      })
    );
    resetPlacement();
  }
}

export const useNemosCore = () => {
  return {
    adjustNemoBy,
    adjustCrewBy,
    adjustHullBy,
    adjustNotorietyBy,
    setSubPhase,
    getTestDiceResult,
    handlePlacementDieClick,
    handlePlacementOptionClick,
  };
};
