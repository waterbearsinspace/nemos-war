// game store
import { nemosStore } from "../../../common/stores/nemosStore";
import { ocean } from "../../../common/stores/slices/oceanSlice";
import { getSubPhaseNumber } from "../../../common/scripts/utils/utils";

// css
import "./Oceans.css";
import { ship } from "../../../common/stores/slices/shipPoolsSlice";
import { useNemosCore } from "../../../common/scripts/nemosCore";
import ShipToken from "../../Ships/ShipToken";

export default function Oceans() {
  // game store selectors
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const oceans = nemosStore((state) => state.oceans);
  const currentNautilusOceanName = nemosStore(
    (state) => state.currentNautilusOceanName
  );
  const placementOptions = nemosStore((state) => state.oceanClickOptions);

  const { handlePlacementOptionClick, moveNautilus } = useNemosCore();

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
                <ShipToken
                  thisShip={thisShip as ship}
                  key={i}
                  handleClickShip={handleClickShip}
                />
              );
            }
            return shipSpaces;
          }

          const handleClickOcean = (thisOcean: ocean) => {
            if (
              currentSubPhase == getSubPhaseNumber("STANDARD PLACEMENT") ||
              currentSubPhase == getSubPhaseNumber("LULL PLACEMENT")
            ) {
              if (placementOptions.includes(thisOcean)) {
                handlePlacementOptionClick(thisOcean);
              }
            } else if (currentSubPhase == getSubPhaseNumber("MOVE")) {
              moveNautilus(thisOcean);
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
