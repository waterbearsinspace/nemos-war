// game store
import { diceStore, dice } from "../../common/stores/diceStore";

// components
import DiceFace1 from "../../common/assets/dice/DiceFace1";
import DiceFace2 from "../../common/assets/dice/DiceFace2";
import DiceFace3 from "../../common/assets/dice/DiceFace3";
import DiceFace4 from "../../common/assets/dice/DiceFace4";
import DiceFace5 from "../../common/assets/dice/DiceFace5";
import DiceFace6 from "../../common/assets/dice/DiceFace6";

// css
import "./Dice.css";
import { ResourceExert } from "../Resources/ResourceExert";

export function Die({ die }: { die: dice }) {
  let faces = [
    <DiceFace1 />,
    <DiceFace2 />,
    <DiceFace3 />,
    <DiceFace4 />,
    <DiceFace5 />,
    <DiceFace6 />,
  ];

  return (
    <div className={`die ${die.id[0] == "w" ? "white" : "black"}`}>
      {faces[die.value - 1]}
    </div>
  );
}

interface DiceTrayInterface {
  testValue?: number;
  numDice?: number;
  buttonText?: string;
  nemoExertable?: boolean;
  crewExertable?: boolean;
  hullExertable?: boolean;
  amountExertable?: number;
}

export default function DiceTray({
  numDice,
  buttonText,
  nemoExertable,
  crewExertable,
  hullExertable,
  amountExertable,
}: DiceTrayInterface) {
  const dice = diceStore((state) => state.dice);
  const setDice = diceStore((state) => state.setDice);
  const doneRolling = diceStore((state) => state.doneRolling);
  const setDoneRolling = diceStore((state) => state.setDoneRolling);

  // constants and functions
  // min (inclusive) and max (exclusive) of die roll
  const dieMinInclusive = 1;
  const dieMaxExclusive = 7;

  // Roll a die with possible from dieMinInclusive to dieMaxExclusive - 1
  function getRandomDieRoll() {
    return Math.floor(
      Math.random() * (dieMinInclusive - dieMaxExclusive) + dieMaxExclusive
    );
  }

  let activeDice: string[];
  function getActiveDice() {
    switch (numDice) {
      case 1:
        activeDice = ["w1"];
        break;
      case 2:
        activeDice = ["w1", "w2"];
        break;
      default:
        activeDice = dice
          .filter((die) => {
            return die.placement == true;
          })
          .map((die) => {
            return die.id;
          });
        break;
    }
  }
  getActiveDice();

  function rollAll() {
    setDoneRolling(true);
    function getRolledDice() {
      return [
        {
          id: "w1",
          value: getRandomDieRoll(),
          placement: dice.find((die) => die.id == "w1")!.placement,
        },
        {
          id: "w2",
          value: getRandomDieRoll(),
          placement: dice.find((die) => die.id == "w2")!.placement,
        },
        {
          id: "w3",
          value: getRandomDieRoll(),
          placement: dice.find((die) => die.id == "w3")!.placement,
        },
        {
          id: "b1",
          value: getRandomDieRoll(),
          placement: dice.find((die) => die.id == "b1")!.placement,
        },
        {
          id: "b2",
          value: getRandomDieRoll(),
          placement: dice.find((die) => die.id == "b2")!.placement,
        },
      ];
    }

    setDice(getRolledDice());
    setTimeout(() => {
      setDice(getRolledDice());
    }, 100);
    setTimeout(() => {
      setDice(getRolledDice());
    }, 200);
    setTimeout(() => {
      setDice(getRolledDice());
    }, 300);
    setTimeout(() => {
      setDice(getRolledDice());
    }, 500);
    setTimeout(() => {
      setDice(getRolledDice());
    }, 700);
    setTimeout(() => {
      setDice(getRolledDice());
    }, 1000);
  }

  function handleClick() {
    rollAll();
  }

  const resourcesExertable = nemoExertable || crewExertable || hullExertable;

  return (
    <div className="dice-tray">
      {resourcesExertable && (
        <div className="resource-space">
          {nemoExertable && (
            <ResourceExert
              option="nemo"
              amountExertable={amountExertable ? amountExertable : 3}
            />
          )}
          {crewExertable && (
            <ResourceExert
              option="crew"
              amountExertable={amountExertable ? amountExertable : 3}
            />
          )}
          {hullExertable && (
            <ResourceExert
              option="hull"
              amountExertable={amountExertable ? amountExertable : 3}
            />
          )}
        </div>
      )}
      <div className="dice-space">
        {dice
          .filter((die) => {
            return activeDice.includes(die.id);
          })
          .map((die) => {
            return <Die die={die} key={die.id} />;
          })}
      </div>
      <button
        className={`roll-all ${doneRolling ? "disabled" : ""}`}
        onClick={doneRolling ? () => {} : handleClick}
      >
        <p>{buttonText ? buttonText : "Roll Dice"}</p>
      </button>
    </div>
  );
}
