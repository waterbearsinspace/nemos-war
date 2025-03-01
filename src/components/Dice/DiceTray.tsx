import { diceStore } from "../../common/stores/diceStore";
import "./Dice.css";
import { Dice } from "../../common/stores/diceStore";

function Die({ die }: { die: Dice }) {
  const rollDie = diceStore((state) => state.rollDie);

  return (
    <button
      className={die.id.includes("w") ? "die white" : "die black"}
      onClick={() => {
        if (die.active) rollDie(die.id);
      }}
    >
      {die.value}
    </button>
  );
}

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
    <div>
      <h2>Dice Tray</h2>
      <div className="dice-tray" style={{ marginBottom: "3rem" }}>
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
    </div>
  );
}
