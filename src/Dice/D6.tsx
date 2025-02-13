import "./Dice.css";
import { diceStore } from "../common/stores/diceStore";

export default function D6({ die }) {
  const rollDie = diceStore((state) => state.rollDie);

  return (
    <button className="dice" onClick={() => rollDie(die.id)}>
      {die.value}
    </button>
  );
}
