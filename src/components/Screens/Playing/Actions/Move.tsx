// game store
import { nemosStore } from "../../../../common/stores/nemosStore";

// components
import Oceans from "../Oceans";

// utils
import { getSubPhaseNumber } from "../../../../common/scripts/utils/utils";

// css
import "./Actions.css";
import { useNemosCore } from "../../../../common/scripts/nemosCore";

export default function Move() {
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const nautilusMoved = nemosStore((state) => state.nautilusMoved);
  const hydroMoved = nemosStore((state) => state.hydroMoved);
  const currentNautilusOceanName = nemosStore(
    (state) => state.currentNautilusOceanName
  );
  const hasHydroMovement = nemosStore((state) =>
    state.currentUpgrades.find((upgrade) => upgrade.name == "Hydro Drive")
  );

  const moveText = !nautilusMoved
    ? "Select Ocean to Move To"
    : "Moved to " + currentNautilusOceanName;

  const { resetMovement } = useNemosCore();

  return (
    <div className="move-select">
      <Oceans />
      <div className="move-select-side-pane">
        <h2>{moveText}</h2>
        <div>
          {hasHydroMovement &&
            nautilusMoved &&
            (!hydroMoved ? (
              <>
                <p>You may move to a second ocean for free</p>
                <p>
                  using your <strong>Hydro Drive Upgrade</strong>
                </p>
              </>
            ) : (
              ""
            ))}
        </div>
      </div>
      {nautilusMoved && (
        <div className="next-phase-wrapper">
          <button
            className="next-phase-button"
            onClick={() => {
              resetMovement();
              setShowNextPhaseButton(false);
              setSubPhase(getSubPhaseNumber("ACTION SELECT"));
            }}
          >
            <p>Continue</p>
          </button>
        </div>
      )}
    </div>
  );
}
