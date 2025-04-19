// game store
import { nemosStore } from "../../../common/stores/nemosStore";
import { ocean } from "../../../common/stores/slices/oceanSlice";
import { getSubPhaseNumber } from "../../../common/scripts/utils/utils";

// css
import "./Oceans.css";
import { ship } from "../../../common/stores/slices/shipPoolsSlice";
import { useNemosCore } from "../../../common/scripts/nemosCore";

export default function Oceans() {
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
    currentNautilusOceanObject?.adjacentOceans.map((ocean) => {
      if (!ocean.placementOnly) return ocean.name;
    });
  const setNautiliusOcean = nemosStore(
    (state) => state.setCurrentNautilusOceanName
  );
  const nautilusAdjacentOceanObjects = oceans.filter((ocean) =>
    nautilusAdjacentOceanNames?.includes(ocean.name)
  );
  const nautilusMoved = nemosStore((state) => state.nautilusMoved);
  const setNautilusMoved = nemosStore((state) => state.setNautilusMoved);
  const hydroMoved = nemosStore((state) => state.hydroMoved);
  const setHydroMoved = nemosStore((state) => state.setHydroMoved);
  const currentUpgrades = nemosStore((state) => state.currentUpgrades);
  const placementOptions = nemosStore((state) => state.placementOptions);

  const { handlePlacementOptionClick } = useNemosCore();

  const hasHydroMovement = currentUpgrades.find(
    (upgrade) => upgrade.name == "Hydro Drive"
  );
  const doneMoving = hasHydroMovement
    ? nautilusMoved && hydroMoved
    : nautilusMoved;

  let clickFunction: (clickedOcean: ocean) => void = () => {};

  let getHighlightRules: (ocean: ocean) => string = () => "";

  switch (currentSubPhase) {
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
    const handleClickShip = (thisShip: ship) => {
      if (placementOptions.includes(thisShip)) {
        handlePlacementOptionClick(thisShip);
      }
    };

    return (
      <div className="ocean-space-container">
        {oceans.map((thisOcean) => {
          function shipSpaces() {
            let shipSpaces = [];
            for (let i = 0; i < thisOcean.maxShips; i++) {
              const thisShip = thisOcean.ships[i];
              shipSpaces.push(
                <div
                  className="ship-space"
                  key={i}
                  data-ship-group={
                    thisShip
                      ? typeof thisShip != "string"
                        ? thisShip?.groupId
                        : "hidden"
                      : ""
                  }
                  data-placement={
                    placementOptions.includes(thisShip) ? "highlight" : ""
                  }
                  onClick={() => {
                    handleClickShip(thisShip as ship);
                  }}
                >
                  <p className="ship-space-name">
                    {thisShip
                      ? typeof thisShip != "string"
                        ? thisShip?.name
                        : "Hidden Ship"
                      : null}
                  </p>
                  <p className="ship-space-class">
                    {thisShip
                      ? typeof thisShip != "string"
                        ? thisShip?.nationality + " " + thisShip?.shipClass
                        : ""
                      : null}
                  </p>
                  <p className="ship-space-attack">
                    {thisShip
                      ? typeof thisShip != "string"
                        ? thisShip.attackStrength
                        : ""
                      : null}
                  </p>
                  <p className="ship-space-defense">
                    {thisShip
                      ? typeof thisShip != "string"
                        ? thisShip.defenseStrength
                        : ""
                      : null}
                  </p>
                </div>
              );
            }
            return shipSpaces;
          }

          const handleClickOcean = (thisOcean: ocean) => {
            if (placementOptions.includes(thisOcean)) {
              handlePlacementOptionClick(thisOcean);
            }
          };

          return (
            <div
              className="ocean-space"
              key={thisOcean.name}
              data-highlight={
                placementOptions.includes(thisOcean) ? "adjacent" : ""
              }
              onClick={() => handleClickOcean(thisOcean)}
            >
              <p>
                <span>
                  <strong>{thisOcean.dieValue} </strong>
                </span>
                <span>
                  {thisOcean.name}
                  <strong>{thisOcean.treasureAvailable ? " ⯁" : ""}</strong>
                </span>
              </p>
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
