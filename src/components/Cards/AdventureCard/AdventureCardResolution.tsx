import { diceStore } from "../../../common/stores/diceStore";
import { nemosStore } from "../../../common/stores/nemosStore";
import { getSubPhaseNumber } from "../../../common/utils/utils";
import DiceTray from "../../Dice/DiceTray";
import AdventureCard from "./AdventureCard";

import "./AdventureCardResolution.css";

interface AdventureCardResolutionInterface {
  id: number;
}

export default function AdventurCardResolution({
  id,
}: AdventureCardResolutionInterface) {
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const showNextPhaseButton = nemosStore((state) => state.showNextPhaseButton);
  const dice = diceStore((state) => state.dice);
  const setDice = diceStore((state) => state.setDice);
  const drawPile = nemosStore((state) => state.drawPile);
  const setDrawPile = nemosStore((state) => state.setDrawPile);
  const setCurrentNautilusOcean = nemosStore(
    (state) => state.setCurrentNautilusOcean
  );
  const oceans = nemosStore((state) => state.oceans);
  const doneRolling = diceStore((state) => state.doneRolling);

  function Test(arg: any) {
    return (
      <div className="test">
        <DiceTray
          numDice={arg.numDice}
          buttonText="Roll for Starting Ocean"
          testId={arg.testId}
        />
      </div>
    );
  }

  function ResolveDisplay() {
    switch (id) {
      case 1001: {
        const handle1001Click = () => {
          resolveAdventureCardsEffects();
          let drawPileCopy = drawPile;
          drawPileCopy.shift();
          setDrawPile(drawPileCopy);
          setSubPhase(getSubPhaseNumber("DRAW EVENT CARD"));
        };
        return (
          <div>
            <Test testId={id} numDice={1} />
            {doneRolling && (
              <div className="next-phase-wrapper">
                <button className="next-phase-button" onClick={handle1001Click}>
                  Draw Event Card
                </button>
              </div>
            )}
          </div>
        );
      }

      default:
        return (
          <div>
            <p>Resolving Event #{id}</p>
            <div className="next-phase-wrapper">
              <button className="next-phase-button" onClick={handleClick}>
                Placement Roll
              </button>
            </div>
          </div>
        );
    }
  }

  function resolveAdventureCardsEffects() {
    switch (id) {
      case 1001: {
        setDice([
          {
            id: "w1",
            value: dice.find((die) => (die.id = "w1"))!.value,
            placement: true,
          },
          {
            id: "w2",
            value: dice.find((die) => (die.id = "w2"))!.value,
            placement: true,
          },
          {
            id: "w3",
            value: dice.find((die) => (die.id = "w3"))!.value,
            placement: false,
          },
          {
            id: "b1",
            value: dice.find((die) => (die.id = "b1"))!.value,
            placement: false,
          },
          {
            id: "b2",
            value: dice.find((die) => (die.id = "b2"))!.value,
            placement: false,
          },
        ]);

        setCurrentNautilusOcean(
          oceans.find((ocean) => ocean.id == dice[0].value)!.name
        );

        break;
      }

      case 1002: {
        setDice([
          {
            id: "w1",
            value: dice.find((die) => (die.id = "w1"))!.value,
            placement: true,
          },
          {
            id: "w2",
            value: dice.find((die) => (die.id = "w2"))!.value,
            placement: true,
          },
          {
            id: "w3",
            value: dice.find((die) => (die.id = "w3"))!.value,
            placement: false,
          },
          {
            id: "b1",
            value: dice.find((die) => (die.id = "b1"))!.value,
            placement: false,
          },
          {
            id: "b2",
            value: dice.find((die) => (die.id = "b2"))!.value,
            placement: false,
          },
        ]);
        break;
      }

      default:
        break;
    }
  }

  const handleClick = () => {
    resolveAdventureCardsEffects();
    let drawPileCopy = drawPile;
    drawPileCopy.shift();
    setDrawPile(drawPileCopy);
    setSubPhase(getSubPhaseNumber("PLACEMENT DICE ROLL"));
  };

  return (
    <>
      {AdventureCard({ card: drawPile[0]! })}
      <ResolveDisplay />
      {showNextPhaseButton && (
        <div className="next-phase-wrapper">
          <button className="next-phase-button" onClick={handleClick}>
            Placement Roll
          </button>
        </div>
      )}
    </>
  );
}
