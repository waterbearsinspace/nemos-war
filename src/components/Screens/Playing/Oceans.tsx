// game store
import { nemosStore } from "../../../common/stores/nemosStore";

// css
import "./Oceans.css";

interface OceansInterface {
  placementFunction?: (selectedPlacementOcean: string) => void;
}

export default function Oceans({ placementFunction }: OceansInterface) {
  const oceans = nemosStore((state) => state.oceans);
  const currentNautilusOcean = nemosStore(
    (state) => state.currentNautilusOcean
  );
  const currentPlacementOcean = nemosStore(
    (state) => state.currentPlacementOcean
  );
  const setCurrentPlacementOcean = nemosStore(
    (state) => state.setCurrentPlacementOcean
  );

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

          const currentPlacementOceanObject = oceans.find(
            (ocean) => ocean.name == currentPlacementOcean
          );
          const thisOceansAdjacentOceans = thisOcean.adjacentMovementOceans.map(
            (ocean) => {
              return ocean.name;
            }
          );
          const oceansAdjacentToCurrentPlacementNames =
            currentPlacementOceanObject?.adjacentMovementOceans.map(
              (ocean) => ocean.name
            );
          const oceansAdjacentToCurrentPlacement = oceans.filter((ocean) => {
            return oceansAdjacentToCurrentPlacementNames?.includes(ocean.name);
          });

          // if this ocean is current placement ocean, is adjacent
          const isCurrentPlacementOcean =
            currentPlacementOcean == thisOcean.name;
          const isAdjacent = thisOceansAdjacentOceans.includes(
            currentPlacementOcean
          );

          const thisOceanIsNotFull =
            thisOcean.ships.length < thisOcean.maxShips;
          const allAdjacentOceansFull = () => {
            for (let i = 0; i < oceansAdjacentToCurrentPlacement.length; i++) {
              if (
                oceansAdjacentToCurrentPlacement[i].ships.length !=
                oceansAdjacentToCurrentPlacement[i].maxShips
              ) {
                return false;
              }
            }
            return true;
          };
          const hiddenShipsPresentInAdjacent = () => {
            for (let i = 0; i < oceansAdjacentToCurrentPlacement.length; i++) {
              if (
                oceansAdjacentToCurrentPlacement[i].ships.includes(
                  "Hidden Ship"
                ) ||
                currentPlacementOceanObject?.ships.includes("Hidden Ship")
              ) {
                return true;
              }
            }
            return false;
          };
          const thisOceanHasRevealable =
            thisOcean.ships.includes("Hidden Ship");

          // if this ocean is adjacent to current placement ocean and is valid
          const isValidPlacement = () => {
            if (isCurrentPlacementOcean || isAdjacent) {
              // if hidden ship is placeable
              if (thisOceanIsNotFull) return true;
              // if new hidden ships not placeable
              else if (allAdjacentOceansFull()) {
                // if hidden ships revealable in any adjacent
                if (hiddenShipsPresentInAdjacent()) {
                  // if this ocean has hidden ships
                  if (thisOceanHasRevealable) return true;
                }
              }
            }
          };

          const handleClick = () => {
            setCurrentPlacementOcean("");
            if (placementFunction) placementFunction(thisOcean.name);
          };

          return (
            <div
              className="ocean-space"
              key={thisOcean.name}
              data-selected={
                isCurrentPlacementOcean
                  ? thisOceanHasRevealable && allAdjacentOceansFull()
                    ? "this-hoverable"
                    : "this"
                  : isValidPlacement()
                  ? "adjacent"
                  : ""
              }
              onClick={isValidPlacement() ? handleClick : () => {}}
            >
              {thisOcean.name}
              <p className="ocean-nautilus">
                {currentNautilusOcean == thisOcean.name ? "You Are Here" : ""}
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
