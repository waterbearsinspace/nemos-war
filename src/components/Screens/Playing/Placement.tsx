// modules
import { useState } from "react";

// game store
import { nemosStore } from "../../../common/stores/nemosStore";
import { dice, diceStore } from "../../../common/stores/diceStore";

// components
import DiceTray, { Die } from "../../Dice/DiceTray";
import Oceans from "./Oceans";

// data and constants
import { maxSavedActionPoints } from "../../../common/stores/slices/actionPointsSlice";

// utils
import { getSubPhaseNumber } from "../../../common/scripts/utils/utils";

// css
import "./Placement.css";
import { useNemosCore } from "../../../common/scripts/nemosCore";

export default function Placement() {
  const oceans = nemosStore((state) => state.oceans);
  const doneRolling = diceStore((state) => state.doneRolling);
  const setDoneRolling = diceStore((state) => state.setDoneRolling);
  const dice = diceStore((state) => state.dice);
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const actionPoints = nemosStore((state) => state.actionPointsCurrent);
  const setActionPoints = nemosStore((state) => state.setActionPointsCurrent);
  const currentPlacementOcean = nemosStore(
    (state) => state.currentPlacementOceanName
  );
  const setLullTurn = nemosStore((state) => state.setIsLullTurn);
  const clickedOcean = nemosStore((state) => state.clickedOcean);

  const differential = Math.abs(
    dice.find((die) => die.id == "w1")!.value -
      dice.find((die) => die.id == "w2")!.value
  );

  const [activeDice, setActiveDice] = useState(
    dice.filter((die) => die.placement)
  );

  const handleFinishedPlacementRollClick = () => {
    setDoneRolling(false);
    if (differential != 0) {
      setLullTurn(false);
      setSubPhase(getSubPhaseNumber("STANDARD PLACEMENT"));
    } else {
      setLullTurn(true);
      setSubPhase(getSubPhaseNumber("LULL PLACEMENT"));
    }
  };

  const handleContinueClick = () => {
    setActionPoints(actionPoints > 0 ? differential + 1 : differential);
    if (actionPoints > maxSavedActionPoints)
      setActionPoints(maxSavedActionPoints);
    setSubPhase(getSubPhaseNumber("ACTION SELECT"));
  };

  function PlacementRoll() {
    return (
      <div className="placement-roll">
        <h2 className="placement-roll-title">Roll for Placement</h2>
        <p className="placement-roll-differential">
          <span>{"Differential: "}</span>{" "}
          <span>{doneRolling ? differential : "-"}</span>
        </p>
        <DiceTray numDice={2} />
        {doneRolling && (
          <div className="next-phase-wrapper">
            <button
              className="next-phase-button"
              onClick={handleFinishedPlacementRollClick}
            >
              Continue to Placement
            </button>
          </div>
        )}
      </div>
    );
  }

  function ShipsToPlace() {
    const { handlePlacementDieClick } = useNemosCore();
    function handleClick(selectedDie: dice) {
      if (!clickedOcean) {
        handlePlacementDieClick(selectedDie.value);
        setActiveDice(activeDice.filter((die) => die.id != selectedDie.id));
      }
    }

    return (
      <>
        {!clickedOcean ? (
          <>
            <h2 className="underline">Ships to Place</h2>
            <div className="dice-to-place-wrapper">
              <div className="dice-to-place-dice-wrapper">
                {activeDice.map((die, index) => {
                  return (
                    <div
                      className="dice-to-place-die"
                      onClick={() => {
                        currentPlacementOcean ? () => {} : handleClick(die);
                      }}
                      key={index}
                      data-die-selected={clickedOcean ? clickedOcean : "none"}
                    >
                      <Die die={die} key={index} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="dice-show-placing">
            <h2 className="dice-show-placing-text bold">
              {
                oceans.find((ocean) => {
                  return ocean.id == clickedOcean.id;
                })?.name
              }
            </h2>
            <Die
              die={
                dice.find((die) => {
                  return die.value == clickedOcean.dieValue;
                })!
              }
            />
          </div>
        )}
      </>
    );
  }

  function ShipPlacement() {
    const noMoreShips = activeDice.length == 0 && !clickedOcean;

    return (
      <>
        <Oceans />
        <div className="placement-side-pane">
          {noMoreShips ? <p>Done Placing Ships</p> : <ShipsToPlace />}
        </div>
        {noMoreShips && (
          <div className="next-phase-wrapper">
            <button className="next-phase-button" onClick={handleContinueClick}>
              Continue to Actions
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="placement-wrapper">
      {currentSubPhase == getSubPhaseNumber("PLACEMENT DICE ROLL") && (
        <PlacementRoll />
      )}
      {currentSubPhase == getSubPhaseNumber("STANDARD PLACEMENT") && (
        <>
          <ShipPlacement />
        </>
      )}
      {currentSubPhase == getSubPhaseNumber("LULL PLACEMENT") && (
        <>
          <ShipPlacement />
        </>
      )}
    </div>
  );
}
