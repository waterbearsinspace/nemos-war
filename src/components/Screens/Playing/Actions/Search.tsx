import { diceStore } from "../../../../common/stores/diceStore";
import { nemosStore } from "../../../../common/stores/nemosStore";
import {
  getSubPhaseNumber,
  shuffleArray,
} from "../../../../common/scripts/utils/utils";
import { Test } from "../../../Dice/Test";

import "./Actions.css";
import { useNemosCore } from "../../../../common/scripts/nemosCore";

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
                  <strong>Exerting</strong> any{" "}
                  <strong>
                    <em>one</em> Ship Resource
                  </strong>
                </li>
                <li>
                  <span className="text-green bold">+1</span> with{" "}
                  <strong>Arcane Library</strong>
                </li>
                <li>
                  <span className="text-red bold">-1</span> per{" "}
                  <em>revealed</em> <strong>Ship</strong>
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
            <p className="result-title text-red">CALAMITY!</p>
            <p className="result-info">
              Lose <span className="crew-text">1 Crew</span> and{" "}
              <span className="hull-text">1 Hull</span>
            </p>
          </td>
          <td className={`${isSelected(3, 6)}`}>
            <p className="result-title text-red">DANGER!</p>
            <p className="result-info">
              Lose <span className="crew-text">1 Crew</span>{" "}
              <strong>
                <em>OR</em>
              </strong>{" "}
              <span className="hull-text">1 Hull</span>
            </p>
          </td>
          <td className={`${isSelected(7, 8)}`}>
            <p className="result-title text-green">SUSPECTED</p>
            <p className="result-info">
              Collect <strong>1 Treasure </strong>
              but <strong>+1 Notoriety</strong>
            </p>
          </td>
          <td className={`${isSelected(9, 11)}`}>
            <p className="result-title text-green">SUCCESS</p>
            <p className="result-info">
              Collect <strong>1 Treasure </strong>
            </p>
          </td>
          <td className={`${isSelected(12, 999)}`}>
            <p className="result-title text-green">EUREKA!</p>
            <p className="result-info">
              Collect <strong>2 Treasures </strong>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default function Search() {
  const doneRolling = diceStore((state) => state.doneRolling);
  const setDoneRolling = diceStore((state) => state.setDoneRolling);
  const treasureDrawPool = nemosStore((state) => state.treasureDrawPool);
  const setTreasureDrawPool = nemosStore((state) => state.setTreasureDrawPool);
  const setCurrentTreasures = nemosStore((state) => state.setCurrentTreasures);
  const currentTreasures = nemosStore((state) => state.currentTreasures);
  const oceans = nemosStore((state) => state.oceans);
  const setOceans = nemosStore((state) => state.setOceans);

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
  const revealedCount = currentOceanShips.length;

  const finalValue = sumRolled + revealedCount;

  const { adjustCrewBy, adjustHullBy, adjustNotorietyBy, setSubPhase } =
    useNemosCore();

  const handleClick = () => {
    const shuffledTreasures = shuffleArray(treasureDrawPool);
    const firstDrawnTreasure = shuffledTreasures[0];
    const secondDrawnTreasure = shuffledTreasures[1];
    const bothDrawnTreasures = [firstDrawnTreasure, secondDrawnTreasure];
    const newTreasuresFirst = treasureDrawPool.filter(
      (treasure) => treasure != firstDrawnTreasure
    );
    const newTreasuresSecond = newTreasuresFirst.filter(
      (treasure) => treasure != secondDrawnTreasure
    );
    const currentOceanIndex = oceans.findIndex(
      (ocean) => ocean == currentOcean
    );

    // apply result
    if (finalValue <= 2) {
      adjustCrewBy(-1);
      adjustHullBy(-1);
    } else if (finalValue <= 6) {
      // decide between one or the other
    } else if (finalValue <= 8) {
      setCurrentTreasures(currentTreasures.concat([firstDrawnTreasure]));
      setTreasureDrawPool(newTreasuresFirst);
      let newOceans = [...oceans];
      newOceans[currentOceanIndex].treasureAvailable = false;
      setOceans(newOceans);
      adjustNotorietyBy(1);
    } else if (finalValue <= 11) {
      setCurrentTreasures(currentTreasures.concat([firstDrawnTreasure]));
      setTreasureDrawPool(newTreasuresFirst);
      let newOceans = [...oceans];
      newOceans[currentOceanIndex].treasureAvailable = false;
      setOceans(newOceans);
    } else if (finalValue >= 12) {
      setCurrentTreasures(currentTreasures.concat(bothDrawnTreasures));
      setTreasureDrawPool(newTreasuresSecond);
      let newOceans = [...oceans];
      newOceans[currentOceanIndex].treasureAvailable = false;
      setOceans(newOceans);
    }
    // adjust treasure
    setDoneRolling(false);
    setSubPhase("ACTION SELECT");
  };

  return (
    <>
      <div>
        <SuccessTable />
        <Test id={"Search"} />
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
