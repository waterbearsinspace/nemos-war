import { diceStore } from "../../../../common/stores/diceStore";
import { nemosStore } from "../../../../common/stores/nemosStore";
import { getSubPhaseNumber } from "../../../../common/scripts/utils/utils";
import { Test } from "../../../Dice/Test";
import { useNemosCore } from "../../../../common/scripts/nemosCore";

import "./Actions.css";

function SuccessTable() {
  const doneRolling = diceStore((state) => state.doneRolling);
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

  const finalValue = doneRolling ? sumRolled + warshipsPresent : "";

  const isSelected = (low: number, high: number) => {
    if (finalValue) {
      if (finalValue >= low && finalValue <= high) {
        return "selected";
      }
    }
    return "";
  };

  return (
    <table className="test-table">
      <thead>
        <tr>
          <td className="test-header" colSpan={5}>
            <div className="test">
              <ul>
                <li>
                  <span className="text-green bold">+X</span> for{" "}
                  <strong>
                    Exerting <em>either</em>
                  </strong>{" "}
                  <span className="nemo-text">Nemo</span>{" "}
                  <strong>
                    <em>OR </em>
                  </strong>
                  <span className="hull-text">Hull</span>
                </li>
                <li>
                  <span className="text-green bold">+X</span> for any{" "}
                  <strong>
                    <em>one </em>
                  </strong>
                  spent <strong>Treasure</strong> token's VP value
                </li>
                <li>
                  <span className="text-red bold">-1</span> if <em>any</em>{" "}
                  <strong>Warships</strong> present
                </li>
              </ul>
              <div className="test-roll-display">
                Total Result: {finalValue}
              </div>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="result-numbers">
          <th className={`text-red ${isSelected(-999, 2)}`}>≤ 2</th>
          <th className={`text-red ${isSelected(3, 6)}`}>3 - 6</th>
          <th className={`text-green ${isSelected(7, 8)}`}>7 - 8</th>
          <th className={`text-green ${isSelected(9, 11)}`}>9 - 11</th>
          <th className={`text-green ${isSelected(12, 999)}`}>≥ 12</th>
        </tr>
        <tr>
          <td className={`${isSelected(-999, 2)}`}>
            <p className="result-title text-red">DESERTION</p>
            <p className="result-info">Lose 1 Crew</p>
          </td>
          <td className={`${isSelected(3, 6)}`}>
            <p className="result-title text-red">BATTLE DRILL</p>
            <p className="result-info">No Effect</p>
          </td>
          <td className={`${isSelected(7, 8)}`}>
            <p className="result-title text-green">SUSPECTED</p>
            <p className="result-info">Gain 1 Crew but +1 Notoriety</p>
          </td>
          <td className={`${isSelected(9, 11)}`}>
            <p className="result-title text-green">RECREATION</p>
            <p className="result-info">Gain 1 Crew</p>
          </td>
          <td className={`${isSelected(12, 999)}`}>
            <p className="result-title text-green">RECRUIT SAILORS</p>
            <p className="result-info">Gain 2 Crew</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

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

  const finalValue = sumRolled + warshipsPresent;

  const { adjustCrewBy, adjustNotorietyBy, setSubPhase } = useNemosCore();

  const handleClick = () => {
    // apply result
    if (finalValue <= 2) {
      adjustCrewBy(-1);
    } else if (finalValue <= 6) {
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
      <div>
        <SuccessTable />
        <Test id={"Rest"} />
      </div>

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
