import { nemosStore } from "../../../common/stores/nemosStore";
import { getSubPhaseNumber } from "../../../common/utils/utils";

export default function Actions() {
  const showNextPhaseButton = nemosStore((state) => state.showNextPhaseButton);
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);

  return (
    <div>
      <p>Select Actions</p>
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
