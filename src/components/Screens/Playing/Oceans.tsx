// game store
import { nemosStore } from "../../../common/stores/nemosStore";
import { ocean } from "../../../common/stores/slices/oceanSlice";
import { getSubPhaseNumber } from "../../../common/utils/utils";

// css
import "./Oceans.css";

interface OceansInterface {
  placementFunction?: (selectedPlacementOcean: string) => void;
}

export default function Oceans({ placementFunction }: OceansInterface) {
  // game store selectors
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const oceans = nemosStore((state) => state.oceans);
  const currentNautilusOceanName = nemosStore(
    (state) => state.currentNautilusOceanName
  );
  const currentNautilusOceanObject = oceans.find(
    (ocean) => ocean.name == currentNautilusOceanName
  );
  const nautilusAdjacentOceanNames =
    currentNautilusOceanObject?.adjacentMovementOceans.map((ocean) => {
      if (!ocean.placementOnly) return ocean.name;
    });
  const setNautiliusOcean = nemosStore(
    (state) => state.setCurrentNautilusOceanName
  );
  const nautilusAdjacentOceanObjects = oceans.filter((ocean) =>
    nautilusAdjacentOceanNames?.includes(ocean.name)
  );
  const currentPlacementOcean = nemosStore(
    (state) => state.currentPlacementOcean
  );
  const setCurrentPlacementOcean = nemosStore(
    (state) => state.setCurrentPlacementOcean
  );
  const currentPlacementOceanObject = oceans.find(
    (ocean) => ocean.name == currentPlacementOcean
  );
  const placementAdjacentOceanNames =
    currentPlacementOceanObject?.adjacentMovementOceans.map((ocean) => {
      return ocean.name;
    });
  const placementAdjacentOceanObjects = oceans.filter((ocean) =>
    placementAdjacentOceanNames?.includes(ocean.name)
  );
  const nautilusMoved = nemosStore((state) => state.nautilusMoved);
  const setNautilusMoved = nemosStore((state) => state.setNautilusMoved);
  const hydroMoved = nemosStore((state) => state.hydroMoved);
  const setHydroMoved = nemosStore((state) => state.setHydroMoved);
  const currentUpgrades = nemosStore((state) => state.currentUpgrades);

  // calculated/utils
  function isCurrentPlacementOcean(ocean: ocean) {
    if (currentPlacementOcean == ocean.name) {
      return true;
    } else return false;
  }
  function getAdjacentOceans(ocean: ocean) {
    const adjacentOceanNames = ocean.adjacentMovementOceans.map((ocean) => {
      return ocean.name;
    });
    const adjacentOceans = oceans.filter((adjacentOcean) =>
      adjacentOceanNames.includes(adjacentOcean.name)
    );
    return adjacentOceans;
  }
  function oceanIsFull(ocean: ocean) {
    return ocean.ships.length >= ocean.maxShips;
  }
  function adjacentOceansAreFull(ocean: ocean) {
    const adjacentOceans = getAdjacentOceans(ocean);
    for (let i = 0; i < adjacentOceans.length; i++) {
      if (!oceanIsFull(adjacentOceans[i])) {
        return false;
      }
    }
    return true;
  }
  const hasHydroMovement = currentUpgrades.find(
    (upgrade) => upgrade.name == "Hydro Drive"
  );
  const doneMoving = hasHydroMovement
    ? nautilusMoved && hydroMoved
    : nautilusMoved;

  // placement
  function hasHiddenShips(ocean: ocean) {
    for (let i = 0; i < ocean.ships.length; i++) {
      if (ocean.ships.includes("Hidden Ship")) return true;
    }
    return false;
  }
  // function hiddenShipPresentInAdjacent(ocean: ocean) {
  //   const adjacentOceans = getAdjacentOceans(ocean);
  //   for (let i = 0; i < adjacentOceans.length; i++) {
  //     if (hasHiddenShips(adjacentOceans[i])) return true;
  //   }
  //   return false;
  // }
  function isValidPlacement(ocean: ocean) {
    // is current placement ocean
    if (isCurrentPlacementOcean(ocean)) {
      // if ocean is not full
      if (!oceanIsFull(ocean)) return true;
      // else if ocean and adjacent oceans are full
      else if (oceanIsFull(ocean) && adjacentOceansAreFull(ocean)) {
        // if ocean has hidden ships
        if (hasHiddenShips(ocean)) return true;
      }
    }
    // is not current placement ocean but is adjacent
    else if (
      !isCurrentPlacementOcean(ocean) &&
      placementAdjacentOceanObjects.includes(ocean)
    ) {
      // if placement ocean exists and is full
      if (
        currentPlacementOceanObject &&
        oceanIsFull(currentPlacementOceanObject)
      ) {
        // if ocean is not full
        if (!oceanIsFull(ocean)) return true;
        // else if placement ocean and its adjacent oceans are full
        else if (
          oceanIsFull(currentPlacementOceanObject) &&
          adjacentOceansAreFull(currentPlacementOceanObject)
        ) {
          // if ocean has hidden ships
          if (hasHiddenShips(ocean)) return true;
        }
      }
    }
    return false;
  }

  let highlightCurrentOceanValue: string;
  let highlightedAdjacentOceans: typeof oceans = [];

  let clickFunction: (clickedOcean: ocean) => void = () => {};

  let getHighlightRules: (ocean: ocean) => string = () => "";

  switch (currentSubPhase) {
    // PLACEMENT
    case getSubPhaseNumber("STANDARD PLACEMENT"):
    case getSubPhaseNumber("LULL PLACEMENT"):
      // set highlight parameters
      if (!currentPlacementOceanObject) {
        highlightCurrentOceanValue = "";
      } else {
        if (!oceanIsFull(currentPlacementOceanObject)) {
          highlightCurrentOceanValue = "this";
        } else if (oceanIsFull(currentPlacementOceanObject)) {
          if (!adjacentOceansAreFull(currentPlacementOceanObject)) {
            highlightCurrentOceanValue = "this";
          } else if (hasHiddenShips(currentPlacementOceanObject)) {
            highlightCurrentOceanValue = "this-hoverable";
          }
        } else highlightCurrentOceanValue = "this";
      }
      // highlight valid adjacent oceans
      highlightedAdjacentOceans = oceans.filter((ocean) => {
        return isValidPlacement(ocean);
      });

      getHighlightRules = (thisOcean: ocean) => {
        return currentPlacementOceanObject
          ? currentPlacementOceanObject == thisOcean
            ? highlightCurrentOceanValue
            : highlightedAdjacentOceans.includes(thisOcean)
            ? "adjacent"
            : ""
          : "";
      };

      // assign clickfunction
      // handle placement click
      const handlePlacementClick = (ocean: ocean) => {
        if (isValidPlacement(ocean)) {
          setCurrentPlacementOcean("");
          if (placementFunction) placementFunction(ocean.name);
        }
      };
      clickFunction = handlePlacementClick;
      break;

    // MOVEMENT
    case getSubPhaseNumber("MOVE"):
      getHighlightRules = (thisOcean: ocean) => {
        return !doneMoving
          ? thisOcean == currentNautilusOceanObject
            ? "this"
            : nautilusAdjacentOceanObjects.includes(thisOcean)
            ? "adjacent"
            : ""
          : "";
      };

      // assign clickfunction
      // handle placement click
      const handleMovementClick = (ocean: ocean) => {
        if (nautilusAdjacentOceanObjects.includes(ocean)) {
          setNautiliusOcean(ocean.name);
          setNautilusMoved(true);
          if (hasHydroMovement) {
            if (nautilusMoved) {
              setHydroMoved(true);
            }
          }
        }
      };
      clickFunction = handleMovementClick;
      break;

    default:
      break;
  }

  function OceanSpaces() {
    return (
      <div className="ocean-space-container">
        {oceans.map((thisOcean) => {
          function shipSpaces() {
            let shipSpaces = [];
            for (let i = 0; i < thisOcean.maxShips; i++) {
              const thisShip = thisOcean.ships[i];
              shipSpaces.push(
                <div className="ship-space" key={i}>
                  <p>
                    {typeof thisShip != "string"
                      ? thisShip?.name
                      : "Hidden Ship"}
                  </p>
                </div>
              );
            }
            return shipSpaces;
          }

          return (
            <div
              className="ocean-space"
              key={thisOcean.name}
              data-highlight={getHighlightRules(thisOcean)}
              onClick={() => {
                clickFunction(thisOcean);
              }}
            >
              {thisOcean.name}
              <p className="ocean-nautilus">
                {currentNautilusOceanName == thisOcean.name
                  ? "You Are Here"
                  : ""}
              </p>
              {shipSpaces()}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="ocean-board">
        <OceanSpaces />
      </div>
    </>
  );
}
