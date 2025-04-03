import { diceStore, Dice } from "../../common/stores/diceStore";
import DiceFace1 from "../../common/assets/dice/DiceFace1";
import DiceFace2 from "../../common/assets/dice/DiceFace2";
import DiceFace3 from "../../common/assets/dice/DiceFace3";
import DiceFace4 from "../../common/assets/dice/DiceFace4";
import DiceFace5 from "../../common/assets/dice/DiceFace5";
import DiceFace6 from "../../common/assets/dice/DiceFace6";

import "./Dice.css";
import { useState } from "react";

function Die({ die }: { die: Dice }) {
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

type DiceTrayProps = {
  testValue?: number;
};

export default function DiceTray({ testValue }: DiceTrayProps) {
  const dice = diceStore((state) => state.dice);
  const setDice = diceStore((state) => state.setDice);

  const [clickable, setClickable] = useState(true);

  // constants and functions
  // min (inclusive) and max (exclusive) of die roll
  const dieMinInclusive = 1;
  const dieMaxExclusive = 7;

  // Roll a die with possible from dieMinInclusive to dieMaxExclusive - 1
  function randomDieRoll() {
    return Math.floor(
      Math.random() * (dieMinInclusive - dieMaxExclusive) + dieMaxExclusive
    );
  }

  function rollAll() {
    function getRolledDie() {
      return dice.map((die) => {
        return {
          id: die.id,
          value: die.active ? randomDieRoll() : die.value,
          active: die.active,
        };
      });
    }

    setDice(getRolledDie());
    setTimeout(() => {
      setDice(getRolledDie());
    }, 100);
    setTimeout(() => {
      setDice(getRolledDie());
    }, 200);
    setTimeout(() => {
      setDice(getRolledDie());
    }, 300);
    setTimeout(() => {
      setDice(getRolledDie());
    }, 500);
    setTimeout(() => {
      setDice(getRolledDie());
    }, 700);
    setTimeout(() => {
      setDice(getRolledDie());
    }, 1000);

    setClickable(false);

    setTimeout(() => {
      setClickable(true);
    }, 5000);
  }

  return (
    <div>
      <div className="dice-tray">
        <div>{testValue ? "Test: " + testValue : ""}</div>
        <div className="dice-space">
          {dice
            .filter((die) => {
              return die.active == true;
            })
            .map((die) => {
              return <Die die={die} key={die.id} />;
            })}
        </div>
        <button
          className={`roll-all ${clickable ? "" : "disabled"}`}
          onClick={clickable ? rollAll : () => {}}
        >
          Roll Dice
        </button>
      </div>
    </div>
  );
}
