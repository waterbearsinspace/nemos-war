import TreasureIcon from "../../common/assets/TreasureIcon";
import { diceStore } from "../../common/stores/diceStore";
import { nemosStore } from "../../common/stores/nemosStore";
import { Die } from "./DiceTray";

interface ResultTableInterface {
  id: string;
  testValue?: number;
}

export default function ResultTable({ id, testValue }: ResultTableInterface) {
  const doneRolling = diceStore((state) => state.doneRolling);
  const activeDice = ["w1", "w2"];
  const activeDiceArray = diceStore((state) => state.dice).filter((die) =>
    activeDice.includes(die.id)
  );
  const sumRolled = doneRolling
    ? activeDiceArray.reduce((sum, die) => sum + die.value, 0)
    : 0;
  const currentOcean = nemosStore((store) =>
    store.oceans.find((ocean) => ocean.name == store.currentNautilusOceanName)
  )!;
  const currentOceanShips = currentOcean.ships.filter(
    (ship) => typeof ship != "string"
  );
  const warshipsPresent = currentOceanShips.find((ship) => {
    return ship.groupId != "A";
  });
  const attackTarget = nemosStore((state) => state.attackTarget);

  const nemoExerted = diceStore((state) => state.exertingNemo);
  const crewExerted = diceStore((state) => state.exertingCrew);
  const hullExerted = diceStore((state) => state.exertingHull);
  const upgrades = nemosStore((state) => state.currentUpgrades);

  const treasureSpent = false;
  const otherWarshipsPresent = currentOceanShips.find((ship) => {
    return ship != attackTarget && ship.groupId != "A";
  });
  const hasArcaneLibaray = upgrades.find(
    (upgrade) => upgrade.name == "Arcane Library"
  );
  const shipsRevealed = currentOceanShips.length > 0;
  const hasReinforcedArmor = upgrades.find(
    (upgrade) => upgrade.name == "Reinforced Armor"
  );
  const hasStrengthenedProw = upgrades.find(
    (upgrade) => upgrade.name == "Strengthened Prow"
  );
  const attackType = nemosStore((state) => state.attackType);

  const nemoExertionValue = nemosStore(
    (state) => state.nemo.exertionDRM[state.nemo.value]
  );
  const crewExertionValue = nemosStore(
    (state) => state.crew.exertionDRM[state.crew.value]
  );
  const hullExertionValue = nemosStore(
    (state) => state.hull.exertionDRM[state.hull.value]
  );
  const hitAmount = nemosStore((state) => state.hitAmount);
  const exertionDRM =
    (nemoExerted ? nemoExertionValue : 0) +
    (crewExerted ? crewExertionValue : 0) +
    (hullExerted ? hullExertionValue : 0);

  let finalValue: number;

  switch (id) {
    case "1":
    case "9":
    case "12":
    case "15":
    case "21":
    case "24":
    case "29":
    case "34":
      {
        finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;
      }
      break;
    case "Repair":
      {
        finalValue =
          exertionDRM +
          (hasArcaneLibaray ? 1 : 0) +
          (shipsRevealed ? -1 : 0) +
          sumRolled;
      }
      break;
    case "Rest":
      {
        finalValue =
          exertionDRM +
          (treasureSpent ? 1 : 0) +
          (warshipsPresent ? -1 : 0) +
          sumRolled;
      }
      break;
    case "Search":
      {
        finalValue =
          exertionDRM +
          (treasureSpent ? 1 : 0) +
          (warshipsPresent ? -1 : 0) +
          sumRolled;
      }
      break;
    case "Warship Attacking":
      {
        finalValue =
          (hasReinforcedArmor ? 1 : 0) +
          (otherWarshipsPresent ? -1 : 0) +
          sumRolled;
      }
      break;
    case "Nautilus Attacking":
      {
        finalValue =
          (attackType == "Stalk" ? 1 : 0) +
          exertionDRM +
          (hasStrengthenedProw ? 1 : 0) +
          (otherWarshipsPresent ? -1 : 0) +
          sumRolled;
      }
      break;
    case "Roll for Number of Hits":
    case "Roll to Apply Hits":
      {
        finalValue = activeDiceArray[0].value;
      }
      break;
    default:
      finalValue = 0;
      break;
  }

  const isSelected = (low: number, high: number) => {
    if (doneRolling) {
      if (sumRolled == 2) {
        if (low == 1 && high == 1) return "selected";
      } else if (finalValue >= low && finalValue <= high) {
        return "selected";
      }
    }
    return "";
  };

  function Header() {
    switch (id) {
      case "Repair": {
        return (
          <tr>
            <td className="test-header" colSpan={5}>
              <div className="test">
                <ul>
                  <li
                    className={`${
                      nemoExerted || crewExerted ? "" : "drm-unmet"
                    }`}
                  >
                    <span className="text-green bold">+X</span> for{" "}
                    <strong>
                      Exerting <em>either</em>
                    </strong>{" "}
                    <span className="nemo-text">Nemo</span>{" "}
                    <strong>
                      <em>OR </em>
                    </strong>
                    <span className="crew-text">Crew </span>
                  </li>
                  <li className={`${treasureSpent ? "" : "drm-unmet"}`}>
                    <span className="text-green bold">+X</span> for any{" "}
                    <strong>
                      <em>one </em>
                    </strong>
                    spent <TreasureIcon text={true} />
                    's VP value
                  </li>
                  <li className={`${warshipsPresent ? "" : "drm-unmet"}`}>
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
        );
      }
      case "Rest": {
        return (
          <tr>
            <td className="test-header" colSpan={5}>
              <div className="test">
                <ul>
                  <li
                    className={`${
                      nemoExerted || hullExerted ? "" : "drm-unmet"
                    }`}
                  >
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
                  <li className={`${treasureSpent ? "" : "drm-unmet"}`}>
                    <span className="text-green bold">+X</span> for any{" "}
                    <strong>
                      <em>one </em>
                    </strong>
                    spent <TreasureIcon text={true} />
                    's VP value
                  </li>
                  <li className={`${warshipsPresent ? "" : "drm-unmet"}`}>
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
        );
      }
      case "Search": {
        return (
          <tr>
            <td className="test-header" colSpan={5}>
              <div className="test">
                <ul>
                  <li
                    className={`${
                      nemoExerted || crewExerted || hullExerted
                        ? ""
                        : "drm-unmet"
                    }`}
                  >
                    <span className="text-green bold">+X</span> for{" "}
                    <strong>Exerting</strong> any{" "}
                    <strong>
                      <em>one</em> Ship Resource
                    </strong>
                  </li>
                  <li className={`${hasArcaneLibaray ? "" : "drm-unmet"}`}>
                    <span className="text-green bold">+1</span> with{" "}
                    <strong>Arcane Library</strong>
                  </li>
                  <li className={`${shipsRevealed ? "" : "drm-unmet"}`}>
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
        );
      }
      case "Warship Attacking": {
        return (
          <tr>
            <td className="test-header" colSpan={5}>
              <div className="test">
                <ul>
                  <li className={`${hasReinforcedArmor ? "" : "drm-unmet"}`}>
                    <span className="text-green bold">+1</span> if the{" "}
                    <em>Nautilus</em> is upgraded with{" "}
                    <strong>Reinforced Armor</strong>
                  </li>
                  <li className={`${otherWarshipsPresent ? "" : "drm-unmet"}`}>
                    <span className="text-red bold">-1</span> if there are any
                    other revealed <strong>Warships</strong> in this{" "}
                    <strong>Ocean</strong>
                  </li>
                </ul>
                <div className="test-roll-display">
                  Total Result: {finalValue}
                </div>
              </div>
            </td>
          </tr>
        );
      }
      case "Nautilus Attacking": {
        return (
          <tr>
            <td className="test-header" colSpan={5}>
              <div className="test">
                <ul>
                  <li className={`${attackType == "Stalk" ? "" : "drm-unmet"}`}>
                    <span className="text-green bold">+1</span> if making a{" "}
                    <strong>{attackType} Attack</strong>
                  </li>
                  <li className={`${hasStrengthenedProw ? "" : "drm-unmet"}`}>
                    <span className="text-green bold">+1</span> if the{" "}
                    <em>Nautilus</em> is upgraded with a{" "}
                    <strong>Strengthened Prow</strong>
                  </li>
                  <li
                    className={`${
                      nemoExerted || crewExerted || hullExerted
                        ? ""
                        : "drm-unmet"
                    }`}
                  >
                    <span className="text-green bold">+X</span> for{" "}
                    <strong>Exerting</strong> any{" "}
                    <strong>
                      <em>one</em> Ship Resource
                    </strong>
                  </li>
                  <li className={`${otherWarshipsPresent ? "" : "drm-unmet"}`}>
                    <span className="text-red bold">-1</span> if there are any
                    other revealed <strong>Warships</strong> in this{" "}
                    <strong>Ocean</strong>
                  </li>
                </ul>
                <div className="test-roll-display">
                  Total Result: {finalValue}
                </div>
              </div>
            </td>
          </tr>
        );
      }
      case "Roll for Number of Hits": {
        return (
          <tr>
            <td className="test-header" colSpan={1}>
              <div className="test">
                <p></p>
                <div className="test-roll-display">
                  Total Result: {finalValue}
                </div>
              </div>
            </td>
          </tr>
        );
      }
      case "Roll to Apply Hits": {
        return (
          <tr>
            <td className="test-header" colSpan={3}>
              <div className="test">
                <h2>Number of Hits Remaining: {hitAmount}</h2>
                <div className="test-roll-display">
                  Total Result: {finalValue}
                </div>
              </div>
            </td>
          </tr>
        );
      }

      // ===============================================
      // ADVENTURE CARDS
      // ===============================================
      // nemo only
      case "1":
      case "21": {
        return (
          <tr>
            <td className="test-header" colSpan={5}>
              <div className="test">
                <ul>
                  <li
                    className={`${
                      nemoExerted || crewExerted || hullExerted
                        ? ""
                        : "drm-unmet"
                    }`}
                  >
                    <span className="text-green bold">+X</span> for{" "}
                    <strong>Exerting</strong>{" "}
                    <span className="nemo-text">Nemo</span>{" "}
                  </li>
                  <li className={`${warshipsPresent ? "" : "drm-unmet"}`}>
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
        );
      }
      // crew only
      case "15": {
        return (
          <tr>
            <td className="test-header" colSpan={5}>
              <div className="test">
                <ul>
                  <li
                    className={`${
                      nemoExerted || crewExerted || hullExerted
                        ? ""
                        : "drm-unmet"
                    }`}
                  >
                    <span className="text-green bold">+X</span> for{" "}
                    <strong>Exerting</strong>{" "}
                    <span className="crew-text">Crew</span>{" "}
                  </li>
                  <li className={`${warshipsPresent ? "" : "drm-unmet"}`}>
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
        );
      }
      // nemo and crew
      case "9": {
        return (
          <tr>
            <td className="test-header" colSpan={5}>
              <div className="test">
                <ul>
                  <li
                    className={`${
                      nemoExerted || crewExerted || hullExerted
                        ? ""
                        : "drm-unmet"
                    }`}
                  >
                    <span className="text-green bold">+X</span> for{" "}
                    <strong>Exerting</strong>{" "}
                    <span className="nemo-text">Nemo</span> and/or
                    <span className="crew-text"> Crew</span>{" "}
                  </li>
                  <li className={`${warshipsPresent ? "" : "drm-unmet"}`}>
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
        );
      }
      // nemo and hull
      case "12":
      case "24": {
        return (
          <tr>
            <td className="test-header" colSpan={5}>
              <div className="test">
                <ul>
                  <li
                    className={`${
                      nemoExerted || crewExerted || hullExerted
                        ? ""
                        : "drm-unmet"
                    }`}
                  >
                    <span className="text-green bold">+X</span> for{" "}
                    <strong>Exerting</strong>{" "}
                    <span className="nemo-text">Nemo</span> and/or
                    <span className="hull-text"> Hull</span>{" "}
                  </li>
                  <li className={`${warshipsPresent ? "" : "drm-unmet"}`}>
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
        );
      }
      // crew and hull
      case "29":
      case "34": {
        return (
          <tr>
            <td className="test-header" colSpan={5}>
              <div className="test">
                <ul>
                  <li
                    className={`${
                      nemoExerted || crewExerted || hullExerted
                        ? ""
                        : "drm-unmet"
                    }`}
                  >
                    <span className="text-green bold">+X</span> for{" "}
                    <strong>Exerting</strong>{" "}
                    <span className="crew-text">Crew</span> and/or
                    <span className="hull-text"> Hull</span>{" "}
                  </li>
                  <li className={`${warshipsPresent ? "" : "drm-unmet"}`}>
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
        );
      }
    }
  }

  function Ranges() {
    switch (id) {
      case "Search":
      case "Rest":
      case "Repair":
      case "Refit":
      case "Incite": {
        return (
          <tr className="result-numbers">
            <th className={`text-red ${isSelected(-999, 2)}`}>≤ 2</th>
            <th className={`text-red ${isSelected(3, 6)}`}>3 - 6</th>
            <th className={`text-green ${isSelected(7, 8)}`}>7 - 8</th>
            <th className={`text-green ${isSelected(9, 11)}`}>9 - 11</th>
            <th className={`text-green ${isSelected(12, 999)}`}>≥ 12</th>
          </tr>
        );
      }
      case "Warship Attacking": {
        const attackStrength = nemosStore(
          (state) => state.attackTarget?.attackStrength
        )!;

        return (
          <tr className="result-numbers">
            <th className={`${isSelected(1, 1)}`}>
              <div className="snake-eyes">
                <Die die={{ id: "w1", value: 1, placement: false }} />
                <Die die={{ id: "w1", value: 1, placement: false }} />
              </div>
            </th>
            <th className={`text-red ${isSelected(-999, attackStrength - 1)}`}>
              ≤ {attackStrength - 1}
            </th>
            <th className={`text-green ${isSelected(attackStrength, 999)}`}>
              ≥ {attackStrength}
            </th>
          </tr>
        );
      }
      case "Nautilus Attacking": {
        const defenseStrength = nemosStore(
          (state) => state.attackTarget?.defenseStrength
        )!;

        return (
          <tr className="result-numbers">
            <th className={`${isSelected(1, 1)}`}>
              <div className="snake-eyes">
                <Die die={{ id: "w1", value: 1, placement: false }} />
                <Die die={{ id: "w1", value: 1, placement: false }} />
              </div>
            </th>
            <th className={`text-red ${isSelected(-999, defenseStrength - 1)}`}>
              ≤ {defenseStrength - 1}
            </th>
            <th className={`text-green ${isSelected(defenseStrength, 999)}`}>
              ≥ {defenseStrength}
            </th>
          </tr>
        );
      }
      case "Roll for Number of Hits": {
        return (
          <tr className="result-numbers">
            <th className={`${isSelected(-999, 999)}`}>1 - 6</th>
          </tr>
        );
      }
      case "Roll to Apply Hits": {
        return (
          <tr className="result-numbers">
            <th className={`nemo-text ${isSelected(1, 1)}`}>1</th>
            <th className={`crew-text ${isSelected(2, 3)}`}>2 - 3</th>
            <th className={`hull-text ${isSelected(4, 6)}`}>4 - 6</th>
          </tr>
        );
      }

      // ===============================================
      // ADVENTURE CARDS
      // ===============================================
      case "1":
      case "9":
      case "12":
      case "15":
      case "21":
      case "24":
      case "29":
      case "34": {
        return (
          <tr className="result-numbers">
            <th className={`text-red ${isSelected(-999, testValue! - 1)}`}>
              ≤ {testValue! - 1}
            </th>
            <th className={`text-green ${isSelected(testValue!, 999)}`}>
              ≥ {testValue!}
            </th>
          </tr>
        );
      }
      default:
        break;
    }
  }

  function Results() {
    switch (id) {
      case "Repair": {
        return (
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
                <strong>
                  1 <TreasureIcon />
                </strong>
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
        );
      }
      case "Rest": {
        return (
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
        );
      }
      case "Search": {
        return (
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
                Collect{" "}
                <strong>
                  1 <TreasureIcon text={true} />
                </strong>
                but <strong>+1 Notoriety</strong>
              </p>
            </td>
            <td className={`${isSelected(9, 11)}`}>
              <p className="result-title text-green">SUCCESS</p>
              <p className="result-info">
                Collect{" "}
                <strong>
                  1 <TreasureIcon text={true} />
                </strong>
              </p>
            </td>
            <td className={`${isSelected(12, 999)}`}>
              <p className="result-title text-green">EUREKA!</p>
              <p className="result-info">
                Collect{" "}
                <strong>
                  2 <TreasureIcon text={true} />
                </strong>
              </p>
            </td>
          </tr>
        );
      }
      case "Warship Attacking": {
        const warshipAttack = nemosStore(
          (state) => state.attackTarget?.attackStrength
        )!;
        const dieValues = diceStore((state) => state.dice)
          .filter((die) => {
            return ["w1", "w2"].includes(die.id);
          })
          .map((die) => {
            return die.value;
          });

        const lowestDieValue = Math.min(...dieValues);

        return (
          <tr>
            <td className={`${isSelected(1, 1)}`}>
              <p className="result-title text-red">DISASTER</p>
              <p className="result-info">
                The <em>Nautilus</em> suffers <strong>1d6 Hits</strong>
              </p>
            </td>
            <td className={`${isSelected(-999, warshipAttack - 1)}`}>
              <p className="result-title text-red">HIT</p>
              <p className="result-info">
                The <em>Nautilus</em> suffers{" "}
                {doneRolling && sumRolled != 2 && sumRolled < warshipAttack
                  ? lowestDieValue
                  : "x"}
                <strong> Hits</strong> (equal to the lowest die's result)
              </p>
            </td>
            <td className={`${isSelected(warshipAttack, 999)}`}>
              <p className="result-title text-green">SAFE</p>
              <p className="result-info">
                The <em>Nautilus</em> survives the attack unscathed, no effect
              </p>
            </td>
          </tr>
        );
      }
      case "Nautilus Attacking": {
        const defenseStrength = nemosStore(
          (state) => state.attackTarget?.defenseStrength
        )!;

        return (
          <tr>
            <td className={`${isSelected(1, 1)}`}>
              <p className="result-title text-red">DISASTER</p>
              <p className="result-info">
                Your target is unaffected; you <strong>Gain</strong> two{" "}
                <strong>Notoriety</strong>{" "}
                <strong className="text-red">
                  <em>AND</em>
                </strong>{" "}
                lose <em className="text-red">two</em>{" "}
                <strong>Exerted Ship Resources</strong> (if any)
              </p>
            </td>
            <td className={`${isSelected(-999, defenseStrength - 1)}`}>
              <p className="result-title text-red">FAILURE</p>
              <p className="result-info">
                You <strong>Gain</strong> one <strong>Notoriety</strong>{" "}
                <strong className="text-red">
                  <em>AND</em>
                </strong>{" "}
                one or more <strong>Exerted Ship Resources</strong> (if any)
              </p>
            </td>
            <td className={`${isSelected(defenseStrength, 999)}`}>
              <p className="result-title text-green">SUCCESS</p>
              <p className="result-info">You have sunk your target!</p>
            </td>
          </tr>
        );
      }
      case "Roll for Number of Hits": {
        return (
          <tr>
            <td className={`${isSelected(-999, 999)}`}>
              <p className="result-title">NUMBER OF HITS</p>
              <p className="result-info">
                Suffer {doneRolling ? activeDiceArray[0].value : "x"}{" "}
                <strong>Hits</strong>
              </p>
            </td>
          </tr>
        );
      }
      case "Roll to Apply Hits": {
        return (
          <tr>
            <td className={`${isSelected(1, 1)}`}>
              <p className="result-title nemo-text">NEMO</p>
              <p className="result-info">
                Lose <strong>1</strong> <span className="nemo-text">Nemo</span>
              </p>
            </td>
            <td className={`${isSelected(2, 3)}`}>
              <p className="result-title crew-text">CREW</p>
              <p className="result-info">
                Lose <strong>1</strong> <span className="crew-text">Crew</span>
              </p>
            </td>
            <td className={`${isSelected(4, 6)}`}>
              <p className="result-title hull-text">HULL</p>
              <p className="result-info">
                Lose <strong>1</strong> <span className="hull-text">Hull</span>
              </p>
            </td>
          </tr>
        );
      }

      // ===============================================
      // ADVENTURE CARDS
      // ===============================================
      case "1":
      case "9":
      case "12":
      case "15":
      case "21":
      case "24":
      case "29":
      case "34": {
        return (
          <tr>
            <td className={`${isSelected(-999, testValue! - 1)}`}>
              <p className="result-title text-red">FAIL</p>
            </td>
            <td className={`${isSelected(testValue!, 999)}`}>
              <p className="result-title text-green">PASS</p>
            </td>
          </tr>
        );
      }
      default:
        break;
    }
  }

  return (
    <table className="test-table">
      <thead>
        <Header />
      </thead>
      <tbody>
        <Ranges />
        <Results />
      </tbody>
    </table>
  );
}
