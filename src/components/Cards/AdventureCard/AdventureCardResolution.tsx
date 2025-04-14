// game store
import { nemosStore } from "../../../common/stores/nemosStore";
import { diceStore } from "../../../common/stores/diceStore";

// components
import DiceTray from "../../Dice/DiceTray";
import AdventureCard, { adventureCard } from "./AdventureCard";

// utils
import { getSubPhaseNumber } from "../../../common/utils/utils";

// css
import "./AdventureCardResolution.css";

interface AdventureCardResolutionInterface {
  card: adventureCard;
}

export default function AdventurCardResolution({
  card,
}: AdventureCardResolutionInterface) {
  const subPhase = nemosStore((state) => state.currentSubPhase);
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const showNextPhaseButton = nemosStore((state) => state.showNextPhaseButton);
  const dice = diceStore((state) => state.dice);
  const setDice = diceStore((state) => state.setDice);
  const drawPile = nemosStore((state) => state.drawPile);
  const setDrawPile = nemosStore((state) => state.setDrawPile);
  const adventureDeck = nemosStore((state) => state.adventureDeck);
  const setAdventureDeck = nemosStore((state) => state.setAdventureDeck);
  const setCurrentNautilusOceanName = nemosStore(
    (state) => state.setCurrentNautilusOceanName
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
    switch (card.id) {
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
            <Test testId={card.id} numDice={1} />
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
          // displays when there is no card resolution for the current card
          <div>
            <p>Resolving Event #{card.id}</p>
            <div className="next-phase-wrapper">
              <button className="next-phase-button" onClick={handleClick}>
                {subPhase == getSubPhaseNumber("RESOLVE EVENT CARD")
                  ? "Placement Roll"
                  : "Continue"}
              </button>
            </div>
          </div>
        );
    }
  }

  function resolveAdventureCardsEffects() {
    switch (card.id) {
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

        setCurrentNautilusOceanName(
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
    if (subPhase == getSubPhaseNumber("RESOLVE EVENT CARD")) {
      let drawPileCopy = drawPile;
      drawPileCopy.shift();
      setDrawPile(drawPileCopy);
      setSubPhase(getSubPhaseNumber("PLACEMENT DICE ROLL"));
    } else {
      let adventureDeckCopy = adventureDeck;
      adventureDeckCopy.shift();
      setAdventureDeck(adventureDeckCopy);
      setSubPhase(getSubPhaseNumber("ACTION SELECT"));
    }
  };

  return (
    <>
      {AdventureCard({ card: card })}
      <ResolveDisplay />
      {showNextPhaseButton && ( // display when there is a card resolution added for the current card
        <div className="next-phase-wrapper">
          <button className="next-phase-button" onClick={handleClick}>
            {subPhase == getSubPhaseNumber("RESOLVE EVENT CARD")
              ? "Placement Roll"
              : "Continue"}
          </button>
        </div>
      )}
    </>
  );
}
