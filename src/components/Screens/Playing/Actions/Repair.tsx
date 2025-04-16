import { diceStore } from "../../../../common/stores/diceStore";
import { nemosStore } from "../../../../common/stores/nemosStore";
import { getSubPhaseNumber } from "../../../../common/utils/utils";
import { Test } from "../../../Dice/Test";

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
                  <span className="crew-text">Crew</span>
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
            <p className="result-title text-red">DAMAGE</p>
            <p className="result-info">
              Lose <span className="hull-text">1 Hull</span>
            </p>
          </td>
          <td className={`${isSelected(3, 6)}`}>
            <p className="result-title text-red">LACK OF PARTS</p>
            <p className="result-info">No Effect</p>
          </td>
          <td className={`${isSelected(7, 8)}`}>
            <p className="result-title text-green">EXPENSIVE</p>
            <p className="result-info">
              Gain <span className="hull-text">1 Hull</span> but Lose{" "}
              <strong>1 Treasure</strong>
            </p>
          </td>
          <td className={`${isSelected(9, 11)}`}>
            <p className="result-title text-green">REGULAR MAINTENANCE</p>
            <p className="result-info">
              Gain <span className="hull-text">1 Hull</span>
            </p>
          </td>
          <td className={`${isSelected(12, 999)}`}>
            <p className="result-title text-green">RECRUIT TEAMS</p>
            <p className="result-info">
              Gain <span className="hull-text">2 Hull</span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default function Repair() {
  const doneRolling = diceStore((state) => state.doneRolling);
  const setDoneRolling = diceStore((state) => state.setDoneRolling);
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const hull = nemosStore((state) => state.hull);
  const setHull = nemosStore((state) => state.setHullValue);

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

  const handleClick = () => {
    // apply result
    if (finalValue <= 2) {
      setHull(hull.value - 1);
    } else if (finalValue <= 6) {
    } else if (finalValue <= 8) {
      setHull(hull.value + 1);
      // lose 1 treasure
    } else if (finalValue <= 11) {
      setHull(hull.value + 1);
    } else if (finalValue >= 12) {
      setHull(hull.value + 2);
    }
    // adjust treasure
    setDoneRolling(false);
    setSubPhase(getSubPhaseNumber("ACTION SELECT"));
  };

  return (
    <>
      <div>
        <SuccessTable />
        <Test id={"Repair"} />
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
