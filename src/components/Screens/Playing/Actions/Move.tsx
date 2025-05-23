// game store
import { nemosStore } from "../../../../common/stores/nemosStore";

// components
import Oceans from "../Oceans";

// css
import "./Actions.css";
import { useNemosCore } from "../../../../common/scripts/nemosCore/useNemosCore";

export default function Move() {
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
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

  const { setSubPhase } = useNemosCore();

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
              setShowNextPhaseButton(false);
              setSubPhase("ACTION SELECT");
            }}
          >
            <p>Continue</p>
          </button>
        </div>
      )}
    </div>
  );
}
