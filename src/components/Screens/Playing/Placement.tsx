import { act } from "react";
import { diceStore } from "../../../common/stores/diceStore";
import { nemosStore } from "../../../common/stores/nemosStore";
import { getSubPhaseNumber } from "../../../common/utils/utils";
import DiceTray from "../../Dice/DiceTray";
import Oceans from "./Oceans";

import "./Placement.css";

export default function Placement() {
  const doneRolling = diceStore((state) => state.doneRolling);
  const setDoneRolling = diceStore((state) => state.setDoneRolling);
  const dice = diceStore((state) => state.dice);
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const actionPoints = nemosStore((state) => state.currentActionPoints);
  const setActionPoints = nemosStore((state) => state.setActionPoints);

  const differential = Math.abs(
    dice.find((die) => die.id == "w1")!.value -
      dice.find((die) => die.id == "w2")!.value
  );

  const handleRollClick = () => {
    setDoneRolling(false);
    setSubPhase(
      getSubPhaseNumber(
        differential == 0 ? "LULL PLACEMENT" : "STANDARD PLACEMENT"
      )
    );
  };

  const handlePlacementClick = () => {
    setActionPoints(actionPoints > 0 ? differential + 1 : differential);
    differential > 0
      ? setSubPhase(getSubPhaseNumber("STANDARD ACTION"))
      : setSubPhase(getSubPhaseNumber("LULL ACTION"));
  };

  function PlacementRoll() {
    return (
      <div>
        <p>Roll for Placement:</p>
        <p>{doneRolling ? "Differential: " + differential : ""}</p>
        <DiceTray numDice={2} />
        {doneRolling && (
          <div className="next-phase-wrapper">
            <button className="next-phase-button" onClick={handleRollClick}>
              Continue
            </button>
          </div>
        )}
      </div>
    );
  }

  function ShipPlacement() {
    return (
      <>
        <Oceans />
        <div className="next-phase-wrapper">
          <button className="next-phase-button" onClick={handlePlacementClick}>
            Continue
          </button>
        </div>
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
          <div className="placement-side-pane">
            <p>Standard Placement</p>
          </div>
        </>
      )}
      {currentSubPhase == getSubPhaseNumber("LULL PLACEMENT") && (
        <>
          <ShipPlacement />
          <div className="placement-side-pane">
            <p>Lull Placement</p>
          </div>
        </>
      )}
    </div>
  );
}
