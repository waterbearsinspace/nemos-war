import { diceStore } from "../../common/stores/diceStore";
import { Dice } from "./DiceType";

export default function Die({ die }: { die: Dice }) {
  const rollDie = diceStore((state) => state.rollDie);

  return (
    <button
      className={die.id.includes("w") ? "die white" : "dice black"}
      onClick={() => {
        if (die.active) rollDie(die.id);
      }}
    >
      {die.value}
    </button>
  );
}
