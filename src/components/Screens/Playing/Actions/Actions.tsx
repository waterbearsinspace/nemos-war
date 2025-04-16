// game store
import { diceStore } from "../../../../common/stores/diceStore";
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

export default function Actions() {
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const actionPoints = nemosStore((state) => state.currentActionPoints);
  const setActionPoints = nemosStore((state) => state.setCurrentActionPoints);
  const isLullTurn = nemosStore((state) => state.isLullTurn);
  const setNautilusMoved = nemosStore((state) => state.setNautilusMoved);
  const setHydroMoved = nemosStore((state) => state.setHydroMoved);
  const setDoneRolling = diceStore((state) => state.setDoneRolling);

  function Actions() {
    const actionNames = [
      {
        name: `Adventure`,
        normalCost: 2,
        lullCost: 1,
      },
      {
        name: `Attack`,
        normalCost: 1,
        lullCost: 1,
      },
      {
        name: `Incite`,
        normalCost: 1,
        lullCost: 1,
      },
      {
        name: `Move`,
        normalCost: 1,
        lullCost: 1,
      },
      {
        name: `Rest`,
        normalCost: 2,
        lullCost: 1,
      },
      {
        name: `Repair`,
        normalCost: 2,
        lullCost: 1,
      },
      {
        name: `Refit`,
        normalCost: 2,
        lullCost: 1,
      },
      {
        name: `Search`,
        normalCost: 1,
        lullCost: 1,
      },
    ];

    function isSelectable(action: action) {
      const actionCost = !isLullTurn ? action.normalCost : action.lullCost;
      let disabled = false;

      // not enough AP
      disabled = actionCost > actionPoints ? true : false;

      if (!disabled) {
        switch (action.name) {
          case "Adventure":
            // adventure deck cannot be empty
            const adventureDeck = nemosStore((state) => state.adventureDeck);
            disabled = adventureDeck.length <= 0 ? true : disabled;
            break;
          case "Attack":
            // not implemented
            disabled = true;
            break;
          case "Incite":
            // not implemented
            disabled = true;
            break;
          case "Move":
            // no special rules
            break;
          case "Rest":
            // no special rules
            break;
          case "Repair":
            // no special rules
            break;
          case "Refit":
            // not implemented
            disabled = true;
            break;
          case "Search":
            // must be treasure available in current ocean
            const currentOceanName = nemosStore(
              (state) => state.currentNautilusOceanName
            );
            const currentOcean = nemosStore((state) =>
              state.oceans.find((ocean) => ocean.name == currentOceanName)
            );

            disabled = !currentOcean?.treasureAvailable;
            break;
        }
      }
      return disabled ? "disabled" : "";
    }

    const handleClick = (action: action) => {
      const actionCost = !isLullTurn ? action.normalCost : action.lullCost;

      if (actionPoints >= actionCost) {
        setActionPoints(actionPoints - actionCost);

        switch (action.name) {
          case "Adventure":
            setSubPhase(getSubPhaseNumber("DRAW ADVENTURE CARD"));
            break;
          case "Move":
            setNautilusMoved(false);
            setHydroMoved(false);
            setSubPhase(getSubPhaseNumber("MOVE"));
            break;

          case "Rest":
            setDoneRolling(false);
            setSubPhase(getSubPhaseNumber("REST"));
            break;
          case "Repair":
            setDoneRolling(false);
            setSubPhase(getSubPhaseNumber("REPAIR"));
            break;
          default:
            break;
        }
      }
    };

    return (
      <div className="actions-select-option-list">
        <section className="action-select-option-list-grid">
          {actionNames.map((action) => {
            const actionCost = !isLullTurn
              ? action.normalCost
              : action.lullCost;
            return (
              <button
                className={`action-select-option ${isSelectable(action)}`}
                key={action.name}
                onClick={() => {
                  handleClick(action);
                }}
              >
                <p>{action.name}</p>
                <p>({actionCost} AP)</p>
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
        <h2>Select Action {isLullTurn ? "(Lull Turn)" : ""}</h2>
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
