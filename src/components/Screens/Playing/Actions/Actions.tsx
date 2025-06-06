// game store
import { diceStore } from "../../../../common/stores/diceStore";
import { nemosStore } from "../../../../common/stores/nemosStore";
import { useNemosCore } from "../../../../common/scripts/nemosCore/useNemosCore";

// components
import Oceans from "../Oceans";

// types and interfaces
type action = {
  name: string;
  normalCost: number;
  lullCost: number;
};

// css
import "./Actions.css";

export default function Actions() {
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
  const actionPoints = nemosStore((state) => state.actionPointsCurrent);
  const setActionPoints = nemosStore((state) => state.setActionPointsCurrent);
  const isLullTurn = nemosStore((state) => state.isLullTurn);
  const setNautilusMoved = nemosStore((state) => state.setNautilusMoved);
  const setHydroMoved = nemosStore((state) => state.setHydroMoved);
  const setDoneRolling = diceStore((state) => state.setDoneRolling);
  const adventureDeck = nemosStore((state) => state.adventureDeck);
  const currentOceanName = nemosStore(
    (state) => state.currentNautilusOceanName
  );
  const currentOcean = nemosStore((state) =>
    state.oceans.find((ocean) => ocean.name == currentOceanName)
  );
  const setCombatPhase = nemosStore((state) => state.setCombatPhase);

  const { handleMovementScreenOptions, setSubPhase, updateAttackOptions } =
    useNemosCore();

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

      let selectable = true;

      // not enough AP
      selectable = actionCost <= actionPoints ? true : false;

      if (selectable) {
        switch (action.name) {
          case "Adventure":
            // adventure deck cannot be empty
            selectable = adventureDeck.length > 0 ? true : false;
            break;
          case "Attack":
            if (currentOcean!.ships.length <= 0) {
              // check if there are ships in the current ocean
              selectable = false;
            }
            break;
          case "Incite":
            // not implemented
            selectable = false;
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
            selectable = false;
            break;
          case "Search":
            // must be treasure available in current ocean
            selectable = currentOcean?.treasureAvailable ? true : false;
            break;
        }
      }

      return selectable;
    }

    const handleClick = (action: action) => {
      const actionCost = !isLullTurn ? action.normalCost : action.lullCost;

      if (isSelectable(action)) {
        setActionPoints(actionPoints - actionCost);
        setNautilusMoved(false);
        setHydroMoved(false);
        setDoneRolling(false);

        switch (action.name) {
          case "Adventure":
            setSubPhase("DRAW ADVENTURE CARD");
            break;
          case "Attack":
            setSubPhase("ATTACK");
            setCombatPhase("Selecting Target");
            updateAttackOptions();
            break;
          case "Move":
            setSubPhase("MOVE");
            handleMovementScreenOptions();
            break;
          case "Rest":
            setSubPhase("REST");
            break;
          case "Repair":
            setSubPhase("REPAIR");
            break;
          case "Search":
            setSubPhase("SEARCH");
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
                className={`action-select-option ${
                  isSelectable(action) ? "" : "disabled"
                }`}
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
              setSubPhase("DRAW EVENT CARD");
            }}
          >
            <p>Continue</p>
          </button>
        </div>
      }
    </div>
  );
}
