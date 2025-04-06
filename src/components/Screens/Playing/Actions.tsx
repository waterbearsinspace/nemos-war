import { nemosStore } from "../../../common/stores/nemosStore";
import { getSubPhaseNumber } from "../../../common/utils/utils";
import Oceans from "./Oceans";

import "./Actions.css";

export default function Actions() {
  // const showNextPhaseButton = nemosStore((state) => state.showNextPhaseButton);
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const actionPoints = nemosStore((state) => state.currentActionPoints);

  function Actions() {
    return (
      <div className="actions-select-option-list">
        <section className="action-select-option-list-column">
          <button name="action-select-option">Adventure</button>
          <button name="action-select-option">Attack</button>
          <button name="action-select-option">Incite</button>
          <button name="action-select-option">Move</button>
        </section>
        <section className="action-select-option-list-column">
          <button name="action-select-option">Rest</button>
          <button name="action-select-option">Repair</button>
          <button name="action-select-option">Refit</button>
          <button name="action-select-option">Search</button>
        </section>
      </div>
    );
  }

  return (
    <div className="actions-select">
      <Oceans />
      <div className="actions-select-side-pane">
        {currentSubPhase == getSubPhaseNumber("LULL ACTION") ? (
          <p>Lull Turn</p>
        ) : (
          <p>Standard Turn</p>
        )}
        <p>
          Action Points: <strong>{actionPoints}</strong>
        </p>
        <Actions />
      </div>
      {
        <div className="next-phase-wrapper">
          <button
            className="next-phase-button"
            onClick={() => {
              setShowNextPhaseButton(false);
              setSubPhase(getSubPhaseNumber("DRAW EVENT CARD"));
            }}
          >
            <p>Continue</p>
          </button>
        </div>
      }
    </div>
  );
}
