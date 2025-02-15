import Die from "./Dice";
import { diceStore } from "../../common/stores/diceStore";

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

  const allDice = diceStore((state) => state.dice);
  const total = allDice
    .filter((die) => die.active)
    .reduce((total, die) => total + die.value, 0);

  const rollAll = diceStore((state) => state.rollAllActive);

  return (
    <div className="dice-tray">
      <div>Total: {total}</div>
      <div>
        <Die
          die={{
            id: whiteDie1.id,
            value: whiteDie1.value,
            active: whiteDie1.active,
          }}
        />
        <Die
          die={{
            id: whiteDie2.id,
            value: whiteDie2.value,
            active: whiteDie2.active,
          }}
        />
        <Die
          die={{
            id: whiteDie3.id,
            value: whiteDie3.value,
            active: whiteDie3.active,
          }}
        />
      </div>
      <button className="roll-all" onClick={rollAll}>
        Roll All
      </button>
    </div>
  );
}
