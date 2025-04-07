import { nemosStore } from "../../../common/stores/nemosStore";
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
              shipSpaces.push(
                <div className="ship-space" key={i}>
                  <p>
                    {thisOcean.ships[i] == "Hidden Ship" ? "Hidden Ship" : ""}
                  </p>
                </div>
              );
            }
            return shipSpaces;
          }

          const handleClick = () => {
            setCurrentPlacementOcean("");
            if (placementFunction) placementFunction(thisOcean.name);
          };

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

          console.log(oceansAdjacentToCurrentPlacement);

          // if this ocean is current placement ocean or adjacent
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
                !oceansAdjacentToCurrentPlacement[i].ships.includes(
                  "Hidden Ship"
                )
              ) {
                return false;
              }
            }
            return true;
          };
          const hasRevealable = thisOcean.ships.includes("Hidden Ship");

          // if this ocean is adjacent to current placement ocean and is valid
          const isValidAdjacent = () => {
            if (isAdjacent) {
              // if hidden ship is placeable
              if (thisOceanIsNotFull) return true;
              // if new hidden ships not placeable
              else if (allAdjacentOceansFull()) {
                // if hidden ships revealable in any adjacent
                if (hiddenShipsPresentInAdjacent()) {
                  // if this ocean has hidden ships
                  if (hasRevealable) return true;
                }
              }
            }
          };

          return (
            <div
              className="ocean-space"
              key={thisOcean.name}
              data-selected={
                isCurrentPlacementOcean
                  ? "this"
                  : isValidAdjacent()
                  ? "adjacent"
                  : ""
              }
              onClick={isValidAdjacent() ? handleClick : () => {}}
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
