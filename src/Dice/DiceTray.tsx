import D6 from "./D6";
import { diceStore } from "../common/stores/diceStore";

export default function DiceTray() {
  const whiteDie1 = diceStore((state) =>
    state.dice.find((die) => die.id == "w1")
  );
  const whiteDie2 = diceStore((state) =>
    state.dice.find((die) => die.id == "w2")
  );
  const whiteDie3 = diceStore((state) =>
    state.dice.find((die) => die.id == "w3")
  );

  return (
    <div className="dice-tray">
      <D6
        die={{
          id: whiteDie1?.id,
          value: whiteDie1?.value,
          active: whiteDie1?.active,
        }}
      />
      <D6
        die={{
          id: whiteDie2?.id,
          value: whiteDie2?.value,
          active: whiteDie2?.active,
        }}
      />
      <D6
        die={{
          id: whiteDie3?.id,
          value: whiteDie3?.value,
          active: whiteDie3?.active,
        }}
      />
    </div>
  );
}
