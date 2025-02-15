import Die from "./Dice";
import { diceStore } from "../../common/stores/diceStore";
import "./Dice.css";

export default function DiceTray() {
  const dummyDie = {
    id: "dummy",
    value: 0,
    active: false,
  };

  const whiteDie1 =
    diceStore((state) => state.dice.find((die) => die.id == "w1")) ?? dummyDie;
  const whiteDie2 =
    diceStore((state) => state.dice.find((die) => die.id == "w2")) ?? dummyDie;
  const whiteDie3 =
    diceStore((state) => state.dice.find((die) => die.id == "w3")) ?? dummyDie;
  const blackDie1 =
    diceStore((state) => state.dice.find((die) => die.id == "b1")) ?? dummyDie;
  const blackDie2 =
    diceStore((state) => state.dice.find((die) => die.id == "b2")) ?? dummyDie;

  const allDice = diceStore((state) => state.dice);
  const total = allDice
    .filter((die) => die.active)
    .reduce((total, die) => total + die.value, 0);

  const rollAll = diceStore((state) => state.rollAllActive);

  return (
    <div className="dice-tray">
      <div>Total: {total}</div>
      <div className="dice-space">
        <Die die={whiteDie1} />
        <Die die={whiteDie2} />
        <Die die={whiteDie3} />
        <Die die={blackDie1} />
        <Die die={blackDie2} />
      </div>
      <button className="roll-all" onClick={rollAll}>
        Roll All
      </button>
    </div>
  );
}
