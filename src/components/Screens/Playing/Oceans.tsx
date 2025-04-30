// game store
import { nemosStore } from "../../../common/stores/nemosStore";
import { ocean } from "../../../common/stores/slices/oceanSlice";
import { getSubPhaseNumber } from "../../../common/scripts/nemosCore/nemosCoreUtils";

// css
import "./Oceans.css";
import { ship } from "../../../common/stores/slices/shipPoolsSlice";
import { useNemosCore } from "../../../common/scripts/nemosCore/useNemosCore";
import ShipToken from "../../Ships/ShipToken";
import { setShipAsAttackTarget } from "../../../common/scripts/nemosCore/nemosCoreOceansShips";

export default function Oceans() {
  // game store selectors
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const oceans = nemosStore((state) => state.oceans);
  const currentNautilusOceanName = nemosStore(
    (state) => state.currentNautilusOceanName
  );
  const currentNautilusOcean = nemosStore((state) =>
    state.oceans.find((ocean) => ocean.name == currentNautilusOceanName)
  );
  const placementOptions = nemosStore((state) => state.oceanClickOptions);
  const attackType = nemosStore((state) => state.attackType);
  const setCombatPhase = nemosStore((state) => state.setCombatPhase);

  const {
    handlePlacementOptionClick,
    moveNautilus,
    revealHiddenShipInOcean,
    updateAttackOptions,
  } = useNemosCore();

  function OceanSpaces() {
    const handleClickShip = (thisShip: ship | string, thisOcean: ocean) => {
      switch (currentSubPhase) {
        case getSubPhaseNumber("STANDARD PLACEMENT"):
        case getSubPhaseNumber("LULL PLACEMENT"):
          if (placementOptions.includes(thisShip)) {
            handlePlacementOptionClick(thisShip as ship);
          }
          break;
        case getSubPhaseNumber("ATTACK"):
          if (thisOcean == currentNautilusOcean) {
            if (typeof thisShip == "string") {
              const targetShip = revealHiddenShipInOcean(thisShip, thisOcean);
              setShipAsAttackTarget(targetShip);
              if (!attackType) {
                setCombatPhase("Selecting Attack Type");
              } else {
                if (targetShip?.groupId != "A") {
                  setCombatPhase("Warship Attacking");
                } else setCombatPhase("Nautilus Attacking");
              }
            } else {
              setShipAsAttackTarget(thisShip);
              if (!attackType) {
                setCombatPhase("Selecting Attack Type");
              } else {
                if (thisShip?.groupId != "A") {
                  setCombatPhase("Warship Attacking");
                } else setCombatPhase("Nautilus Attacking");
              }
            }
            updateAttackOptions();
          }
          break;
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
                  handleClickShip={() => {
                    handleClickShip(thisShip, thisOcean);
                  }}
                  currentOcean={thisOcean}
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
