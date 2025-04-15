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
import { getSubPhaseNumber, shuffleArray } from "../../../common/utils/utils";

// css
import "./Placement.css";

export default function Placement() {
  const doneRolling = diceStore((state) => state.doneRolling);
  const setDoneRolling = diceStore((state) => state.setDoneRolling);
  const dice = diceStore((state) => state.dice);
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const actionPoints = nemosStore((state) => state.currentActionPoints);
  const setActionPoints = nemosStore((state) => state.setCurrentActionPoints);
  const oceans = nemosStore((state) => state.oceans);
  const setOceans = nemosStore((state) => state.setOceans);
  const currentPlacementOcean = nemosStore(
    (state) => state.currentPlacementOcean
  );
  const setCurrentPlacementOcean = nemosStore(
    (state) => state.setCurrentPlacementOcean
  );
  const shipPool = nemosStore((state) => state.currentShipPool);
  const setLullTurn = nemosStore((state) => state.setIsLullTurn);

  const differential = Math.abs(
    dice.find((die) => die.id == "w1")!.value -
      dice.find((die) => die.id == "w2")!.value
  );

  const [activeDice, setActiveDice] = useState(
    dice.filter((die) => die.placement)
  );
  const [selectedDie, setSelectedDie] = useState(dice[0]);

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
    function handleClick(selectedDie: dice) {
      setSelectedDie(selectedDie);
      const oceanToPlaceIn = oceans.find(
        (ocean) => ocean.id == selectedDie.value
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
        setActiveDice(activeDice.filter((die) => die.id != selectedDie.id));
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
    // placement when hidden ship not placeable
    function placeShip(selectedPlacementOcean: string) {
      const oceanToPlaceIn = oceans.find(
        (ocean) => ocean.name == selectedPlacementOcean
      );
      const adjacentOceans = oceans.filter((ocean) => {
        return oceanToPlaceIn?.adjacentMovementOceans
          .map((ocean) => {
            return ocean.name;
          })
          .includes(ocean.name);
      });
      const hiddenShipsRevealable =
        oceanToPlaceIn?.ships.includes("Hidden Ship") &&
        adjacentOceans.map((ocean) => {
          if (!ocean.ships.includes("Hidden Ship")) {
            return false;
          }
        });

      // spread out
      // if ocean to place in has room for hidden ships
      const oceanNotEmpty =
        oceanToPlaceIn!.ships.length < oceanToPlaceIn!.maxShips;
      if (oceanNotEmpty) {
        const newOceanToPlaceIn = {
          ...oceanToPlaceIn!,
          ships: oceanToPlaceIn!.ships.concat(["Hidden Ship"]),
        };
        const newOceans = oceans.map((ocean) => {
          if (ocean != oceanToPlaceIn) return ocean;
          else return newOceanToPlaceIn;
        });
        setOceans(newOceans);
        setActiveDice(activeDice.filter((die) => die.id != selectedDie.id));
      }

      // reveal
      // if selected ocean and adjacent oceans have hidden ships to reveal
      else if (hiddenShipsRevealable) {
        const shipPoolCopy = shuffleArray(shipPool);
        const drawnShip = shipPoolCopy.shift();
        const shipToReplaceIndex = oceanToPlaceIn?.ships.findIndex(
          (ship) => ship == "Hidden Ship"
        );
        let shipsWithReplaced = oceanToPlaceIn?.ships;
        shipsWithReplaced![shipToReplaceIndex!] = drawnShip;

        const newOcean = oceans.map((ocean) => {
          if (ocean != oceanToPlaceIn) return ocean;
          else return { ...oceanToPlaceIn, ships: shipsWithReplaced! };
        });
        setOceans(newOcean);
        setActiveDice(activeDice.filter((die) => die.id != selectedDie.id));
      }

      // get hostile
      // go hunting

      // remove ship die
      else setActiveDice(activeDice.filter((die) => die.id != selectedDie.id));
    }

    const noMoreShips = activeDice.length == 0;
    return (
      <>
        <Oceans placementFunction={placeShip} />
        <div className="placement-side-pane">
          <h2>Ship Placement</h2>
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
