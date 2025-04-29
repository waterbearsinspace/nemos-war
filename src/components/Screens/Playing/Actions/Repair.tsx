import { diceStore } from "../../../../common/stores/diceStore";
import { nemosStore } from "../../../../common/stores/nemosStore";
import { useNemosCore } from "../../../../common/scripts/nemosCore/useNemosCore";

import "./Actions.css";
import TableAndTest from "../../../Dice/TableAndTest";

export default function Repair() {
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

  const { adjustHullBy, setSubPhase, applyFailedTestPenalty, exertionDRM } =
    useNemosCore();

  const finalValue = sumRolled + exertionDRM + warshipsPresent;

  const handleClick = () => {
    // apply result
    if (finalValue <= 2) {
      adjustHullBy(-1);
      applyFailedTestPenalty();
    } else if (finalValue <= 6) {
      applyFailedTestPenalty();
    } else if (finalValue <= 8) {
      adjustHullBy(1);
      // lose 1 treasure
    } else if (finalValue <= 11) {
      adjustHullBy(1);
    } else if (finalValue >= 12) {
      adjustHullBy(2);
    }
    // adjust treasure
    setDoneRolling(false);
    setSubPhase("ACTION SELECT");
  };

  return (
    <>
      <TableAndTest id={"Repair"} />
      {doneRolling && ( // display when there is a card resolution added for the current card
        <div className="next-phase-wrapper">
          <button className="next-phase-button" onClick={handleClick}>
            Continue
          </button>
        </div>
      )}
    </>
  );
}
