import { act, useState } from "react";
import { dice, diceStore } from "../../../common/stores/diceStore";
import { nemosStore } from "../../../common/stores/nemosStore";
import { getSubPhaseNumber } from "../../../common/utils/utils";
import DiceTray, { Die } from "../../Dice/DiceTray";
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
  const oceans = nemosStore((state) => state.oceans);
  const setOceans = nemosStore((state) => state.setOceans);
  const currentPlacementOcean = nemosStore(
    (state) => state.currentPlacementOcean
  );
  const setCurrentPlacementOcean = nemosStore(
    (state) => state.setCurrentPlacementOcean
  );

  const differential = Math.abs(
    dice.find((die) => die.id == "w1")!.value -
      dice.find((die) => die.id == "w2")!.value
  );

  const [activeDice, setActiveDice] = useState(
    dice.filter((die) => die.placement)
  );

  const handleRollClick = () => {
    setDoneRolling(false);
    setSubPhase(getSubPhaseNumber("STANDARD PLACEMENT"));
  };

  const handlePlacementClick = () => {
    setActionPoints(actionPoints > 0 ? differential + 1 : differential);
    differential > 0
      ? setSubPhase(getSubPhaseNumber("STANDARD ACTION"))
      : setSubPhase(getSubPhaseNumber("LULL ACTION"));
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
            <button className="next-phase-button" onClick={handleRollClick}>
              Continue to Placement
            </button>
          </div>
        )}
      </div>
    );
  }

  function ShipsToPlace() {
    function handleClick(selectedDie: dice) {
      const oceanToPlaceIn = oceans.find(
        (ocean) => ocean.id == selectedDie.value
      );

      const adjacentOceans = oceanToPlaceIn?.adjacentMovementOceans.map(
        (ocean) => {
          return ocean.name;
        }
      );

      // hidden ship placeable
      const numShipsInOcean = oceanToPlaceIn!.ships.length;
      const maxNumShipsInOcean = oceanToPlaceIn!.maxShips;
      if (numShipsInOcean < maxNumShipsInOcean) {
        const newOceanToPlaceIn = {
          ...oceanToPlaceIn!,
          ships: oceanToPlaceIn!.ships.concat(["Hidden Ship"]),
        };
        const newOceans = oceans.map((ocean) => {
          if (ocean != oceanToPlaceIn) return ocean;
          else return newOceanToPlaceIn;
        });
        setOceans(newOceans);
        // setActiveDice(activeDice.filter((die) => die.id != selectedDie.id));
      } else {
        setCurrentPlacementOcean(oceanToPlaceIn!.name);
      }
    }

    return (
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
              >
                <Die die={die} key={index} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function ShipPlacement() {
    const noMoreShips = activeDice.length == 0; // hidden ship not placeable
    function placeShip(selectedPlacementOcean: string) {
      let oceanToPlaceIn = oceans.find(
        (ocean) => ocean.name == selectedPlacementOcean
      );
      console.log("placing in " + oceanToPlaceIn?.name);

      // spread out
      if (oceanToPlaceIn!.ships.length < oceanToPlaceIn!.maxShips) {
        const newOceanToPlaceIn = {
          ...oceanToPlaceIn!,
          ships: oceanToPlaceIn!.ships.concat(["Hidden Ship"]),
        };
        const newOceans = oceans.map((ocean) => {
          if (ocean != oceanToPlaceIn) return ocean;
          else return newOceanToPlaceIn;
        });
        setOceans(newOceans);
        // setActiveDice(activeDice.filter((die) => die.id != selectedDie.id));
      }

      // reveal
      // get hostile
      // go hunting

      // remove ship die
      // else setActiveDice(activeDice.filter((die) => die.id != id));
    }

    return (
      <>
        <Oceans placementFunction={placeShip} />
        <div className="placement-side-pane">
          <h2>Ship Placement</h2>
          {noMoreShips ? <p>Done Placing Ships</p> : <ShipsToPlace />}
        </div>
        {noMoreShips && (
          <div className="next-phase-wrapper">
            <button
              className="next-phase-button"
              onClick={handlePlacementClick}
            >
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
    </div>
  );
}
