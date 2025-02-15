import "./Dice.css";
import { diceStore } from "../../common/stores/diceStore";
import { Dice } from "./DiceType";

export default function Die({ die }: { die: Dice }) {
  const rollDie = diceStore((state) => state.rollDie);

  return (
    <button className="dice" onClick={() => rollDie(die.id)}>
      {die.value}
    </button>
  );
}
