import "./Dice.css";
import { diceStore } from "../../common/stores/diceStore";
import { Dice } from "./DiceInterface";

export default function D6({ die }: { die: Dice }) {
  const rollDie = diceStore((state) => state.rollDie);

  return (
    <button className="dice" onClick={() => rollDie(die.id)}>
      {die.value}
    </button>
  );
}
