// game store
import { nemosStore } from "../../../../common/stores/nemosStore";

// components
import Oceans from "../Oceans";

// types and interfaces
type action = {
  name: string;
  normalCost: number;
  lullCost: number;
};

// utils
import { getSubPhaseNumber } from "../../../../common/utils/utils";

// css
import "./Actions.css";

export default function Move() {
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const nautilusMoved = nemosStore((state) => state.nautilusMoved);
  const currentNautilusOceanName = nemosStore(
    (state) => state.currentNautilusOceanName
  );

  return (
    <div className="actions-select">
      <Oceans />
      <div className="actions-select-side-pane">
        <h2>
          {!nautilusMoved
            ? "Select Ocean to Move To"
            : "Moved to " + currentNautilusOceanName}
        </h2>
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
