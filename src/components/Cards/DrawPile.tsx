// modules
import { useState } from "react";

// gameState
import { gameStateStore } from "../../common/stores/gameStateStore";

// data
import adventureCards from "../../common/data/adventure_cards.json";

// components
import motives from "../../common/data/motives.json";
import AdventureCard from "./AdventureCard.tsx/AdventureCard";

// utils
import { shuffleArray } from "../../common/utils/utils";

export default function DrawPile() {
  const [drawPileIndex, setDrawPileIndex] = useState(0);
  const drawPile = gameStateStore((state) => state.drawPile);

  let motive = gameStateStore((state) => state.currentMotive);
  let setDrawPile = gameStateStore((state) => state.setDrawPile);
  let setAdventureDeck = gameStateStore((state) => state.setAdventureDeck);

  let setupDrawPile = () => {
    let finishedDrawPile: any = [];
    let workingPile: any = [];
    // utils
    function workingToFinished() {
      shuffleArray(workingPile);
      finishedDrawPile = finishedDrawPile.concat(workingPile);
      workingPile = [];
    }
    function pushNumCardsToWorking(num: number) {
      for (let i = 0; i < num; i++) {
        workingPile.push(regularAdventureCards.pop());
      }
    }

    // deck prep
    // regular adventure cards
    let regularAdventureCards = adventureCards.filter((card) => {
      return card.id < 1000;
    });
    shuffleArray(regularAdventureCards);
    // finale cards
    let finales = adventureCards.filter((card) => {
      return card.id > 9000 ? true : false;
    });
    shuffleArray(finales);

    // setup deck
    // finale: random finale + 4
    workingPile.push(finales.pop());
    pushNumCardsToWorking(4);
    workingToFinished();

    // act three: rising action + [motive]
    workingPile.push(adventureCards.find((card) => card.id == 1004));
    pushNumCardsToWorking(motives[motive].act_three_cards);
    workingToFinished();

    // second intermission
    finishedDrawPile.push(adventureCards.find((card) => card.id == 1003));

    // act two: rising action + [motive]
    pushNumCardsToWorking(motives[motive].act_two_cards);
    workingToFinished();

    // first intermission
    finishedDrawPile.push(adventureCards.find((card) => card.id == 1002));

    // act one: 6
    pushNumCardsToWorking(6);
    workingToFinished();

    // prologue
    finishedDrawPile.push(adventureCards.find((card) => card.id == 1001));

    // flip deck over
    finishedDrawPile.reverse();

    setDrawPile(finishedDrawPile);
    setAdventureDeck(regularAdventureCards);

    setDrawPileIndex(0);
  };

  const handleClick = (inc: number) => {
    if (drawPileIndex + inc > drawPile.length - 1) {
      setDrawPileIndex(0);
    } else if (drawPileIndex + inc < 0) {
      setDrawPileIndex(drawPile.length - 1);
    } else setDrawPileIndex(drawPileIndex + inc);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
      }}
    >
      <h2>Draw Pile</h2>
      <AdventureCard
        card={gameStateStore((state) => state.drawPile[drawPileIndex])}
      />
      <div className="button-wrapper">
        <button
          onClick={() => {
            handleClick(-1);
          }}
        >
          ←
        </button>
        <button onClick={setupDrawPile}>
          {drawPile.length == 0
            ? ""
            : drawPileIndex + 1 + "/" + drawPile.length}
        </button>
        <button
          onClick={() => {
            handleClick(1);
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
