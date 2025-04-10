// game store
import { nemosStore } from "../../../common/stores/nemosStore";

// components
import Oceans from "./Oceans";

// utils
import { getSubPhaseNumber } from "../../../common/utils/utils";

// css
import "./Actions.css";

export default function Actions() {
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const actionPoints = nemosStore((state) => state.currentActionPoints);
  const setActionPoints = nemosStore((state) => state.setCurrentActionPoints);

  function Actions() {
    const actions = [
      "Adventure",
      "Attack",
      "Incite",
      "Move",
      "Rest",
      "Repair",
      "Refit",
      "Search",
    ];

    const handleClick = (action: string) => {
      switch (action) {
        case "Adventure":
          if (actionPoints >= 2) {
            setActionPoints(actionPoints - 2);
            setSubPhase(getSubPhaseNumber("DRAW ADVENTURE CARD"));
          } else window.alert("Not enough action points!");
          break;
        default:
          break;
      }
    };

    return (
      <div className="actions-select-option-list">
        <section className="action-select-option-list-grid">
          {actions.map((action) => {
            return (
              <button
                className="action-select-option"
                key={action}
                onClick={() => {
                  handleClick(action);
                }}
              >
                {action}
              </button>
            );
          })}
        </section>
      </div>
    );
  }

  return (
    <div className="actions-select">
      <Oceans />
      <div className="actions-select-side-pane">
        <h2>Select Action</h2>
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
