import { dice } from "../../stores/diceStore";
import { nemosStore } from "../../stores/nemosStore";
import { ocean } from "../../stores/slices/oceanSlice";
import { ship } from "../../stores/slices/shipPoolsSlice";
import { loseGame } from "./nemosCoreEndGame";
import { drawShip } from "./nemosCoreOceansShips";
import { resetPlacement } from "./nemosCoreResets";
import { getFlippedShip } from "./nemosCoreUtils";

// ============================
// PLACEMENT
// ============================

// handle click of a placement die
export function handlePlacementDieClick(die: dice) {
  const setOceanClickType = nemosStore.getState().setOceanClickType;
  const setClickedOcean = nemosStore.getState().setClickedOcean;
  const setOceanClickOptions = nemosStore.getState().setOceanClickOptions;

  // all oceans
  const oceans = nemosStore.getState().oceans;
  // placement ocean
  const placementOcean = oceans.find((ocean) => {
    return ocean.dieValue == die.value;
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
  setClickedOcean(placementOcean);
  if (placementOceanNotFull) {
    setOceanClickType("Place Hidden");
    const setOceans = nemosStore.getState().setOceans;
    const newShips = placementOceanShips!.concat("Hidden Ship");
    setOceans(
      oceans.map((ocean) => {
        return ocean == placementOcean
          ? { ...placementOcean, ships: newShips }
          : ocean;
      })
    );
    setOceanClickType("");
    setClickedOcean(null);
  }
  // else Spread Out if ocean is full and adjacent oceans are not full - hidden ship in adjacent ocean
  else if (!placementOceanNotFull && adjacentOceansNotFull) {
    setOceanClickType("Spread Out");
    // highlight adjacent oceans that are not full
    setOceanClickOptions(adjacentOceansThatAreNotFull);
  }
  // else Reveal if ocean is full and adjacent oceans are full there is a hidden ship revealable in any - reveal hidden ship
  else if (
    !placementOceanNotFull &&
    !adjacentOceansNotFull &&
    (placementOceanHasHiddenShip || adjacentOceansHaveHiddenShip)
  ) {
    setOceanClickType("Reveal");
    // highlight adjacent oceans that have a hidden ship
    setOceanClickOptions(
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
    setOceanClickType("Get Hostile");
    // highlight white ships in ocean and adjacent oceans
    setOceanClickOptions(
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
    setOceanClickType("Go Hunting");
    // highlight non full oceans
    setOceanClickOptions(nonEmptyOceans);
  }
  // else lose the game
  else {
    loseGame(
      "There was no more room in all the Oecans for an additional Warship!"
    );
  }
}

export function handlePlacementOptionClick(option: ocean | ship) {
  const oceans = nemosStore.getState().oceans;
  const oceanClickType = nemosStore.getState().oceanClickType;
  const oceanOption = option as ocean;

  const setOceans = nemosStore.getState().setOceans;

  const setAttackingPlacedShip = nemosStore.getState().setAttackingPlacedShip;

  // select option
  // if Place Hidden
  if (oceanClickType == "Place Hidden") {
    // do nothing, handled in die click
  }
  // if Spread Out
  if (oceanClickType == "Spread Out") {
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
  if (oceanClickType == "Reveal") {
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
  if (oceanClickType == "Get Hostile") {
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
  if (oceanClickType == "Go Hunting") {
    // on clicking ocean, place warship
    const optionOcean = option as ocean;
    const drawnShip = drawShip();

    const finalDrawnShip =
      typeof drawnShip != "string"
        ? drawnShip.groupId == "A"
          ? getFlippedShip(drawnShip)
          : drawnShip
        : drawnShip;

    const newShips = optionOcean.ships.concat(finalDrawnShip);
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
