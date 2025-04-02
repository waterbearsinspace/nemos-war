import { diceStore } from "../../common/stores/diceStore";
import "./Dice.css";
import { Dice } from "../../common/stores/diceStore";
import DiceFace1 from "../../common/assets/dice/DiceFace1";
import DiceFace2 from "../../common/assets/dice/DiceFace2";
import DiceFace3 from "../../common/assets/dice/DiceFace3";
import DiceFace4 from "../../common/assets/dice/DiceFace4";
import DiceFace5 from "../../common/assets/dice/DiceFace5";
import DiceFace6 from "../../common/assets/dice/DiceFace6";

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

  const diceList = [whiteDie1, whiteDie2, whiteDie3, blackDie1, blackDie2];

  const rollAll = diceStore((state) => state.rollAllActive);

  return (
    <div>
      <div className="dice-tray">
        <div>{testValue ? "Test: " + testValue : ""}</div>
        <div className="dice-space">
          {diceList
            .filter((die) => {
              return die.active == true;
            })
            .map((die) => {
              return <Die die={die} />;
            })}
        </div>
        <button className="roll-all" onClick={rollAll}>
          Roll Dice
        </button>
      </div>
    </div>
  );
}
