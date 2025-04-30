import { diceStore } from "../../../../common/stores/diceStore";
import { nemosStore } from "../../../../common/stores/nemosStore";
import { useNemosCore } from "../../../../common/scripts/nemosCore/useNemosCore";

import "./Actions.css";
import TableAndTest from "../../../Dice/TableAndTest";

export default function Rest() {
  const doneRolling = diceStore((state) => state.doneRolling);
  const setDoneRolling = diceStore((state) => state.setDoneRolling);

  const activeDice = ["w1", "w2"];
  const activeDiceArray = diceStore((state) => state.dice).filter((die) =>
    activeDice.includes(die.id)
  );
  const sumRolled = activeDiceArray.reduce((sum, die) => sum + die.value, 0);
  const currentOcean = nemosStore((store) =>
    store.oceans.find((ocean) => ocean.name == store.currentNautilusOceanName)
  )!;
  const currentOceanShips = currentOcean.ships.filter(
    (ship) => typeof ship != "string"
  );
  const warshipsPresent = currentOceanShips.find((ship) => ship.groupId != "A")
    ? -1
    : 0;

  const nemoExertionValue =
    nemosStore.getState().nemo.exertionDRM[nemosStore.getState().nemo.value];
  const crewExertionValue =
    nemosStore.getState().crew.exertionDRM[nemosStore.getState().crew.value];
  const hullExertionValue =
    nemosStore.getState().hull.exertionDRM[nemosStore.getState().hull.value];
  const nemoExerted = diceStore.getState().exertingNemo;
  const crewExerted = diceStore.getState().exertingCrew;
  const hullExerted = diceStore.getState().exertingHull;
  const exertionDRM =
    (nemoExerted ? nemoExertionValue : 0) +
    (crewExerted ? crewExertionValue : 0) +
    (hullExerted ? hullExertionValue : 0);

  const {
    adjustCrewBy,
    adjustNotorietyBy,
    setSubPhase,
    applyFailedTestPenalty,
  } = useNemosCore();

  const finalValue = sumRolled + exertionDRM + warshipsPresent;

  const handleClick = () => {
    // apply result
    if (finalValue <= 2) {
      adjustCrewBy(-1);
      applyFailedTestPenalty();
    } else if (finalValue <= 6) {
      applyFailedTestPenalty();
    } else if (finalValue <= 8) {
      adjustCrewBy(1);
      adjustNotorietyBy(1);
    } else if (finalValue <= 11) {
      adjustCrewBy(1);
    } else if (finalValue >= 12) {
      adjustCrewBy(2);
    }
    // adjust treasure
    setDoneRolling(false);
    setSubPhase("ACTION SELECT");
  };

  return (
    <>
      <TableAndTest id={"Rest"} />

      {doneRolling && (
        <div className="next-phase-wrapper">
          <button className="next-phase-button" onClick={handleClick}>
            Continue
          </button>
        </div>
      )}
    </>
  );
}
