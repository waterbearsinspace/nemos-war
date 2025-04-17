// game store
import { nemosStore } from "../../../../common/stores/nemosStore";

// components
import Oceans from "../Oceans";

// utils
import { getSubPhaseNumber } from "../../../../common/scripts/utils/utils";

// css
import "./Actions.css";

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

  return (
    <div className="actions-select">
      <Oceans />
      <div className="actions-select-side-pane">
        <h2>{moveText}</h2>
        <p>
          {hasHydroMovement &&
            nautilusMoved &&
            (!hydroMoved
              ? "Move to another ocean thanks to your Hydro Drive upgrade or Continue"
              : "")}
        </p>
      </div>
      {nautilusMoved && (
        <div className="next-phase-wrapper">
          <button
            className="next-phase-button"
            onClick={() => {
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
