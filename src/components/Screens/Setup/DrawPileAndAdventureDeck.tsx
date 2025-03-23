// modules
import { useEffect, useState } from "react";

// game store
import { nemosStore } from "../../../common/stores/nemosStore";

// data and constants
import adventureCards from "../../../common/data/adventureCards.json";

// components
import motives from "../../../common/data/motives.json";

// utils
import { getSubPhaseNumber, shuffleArray } from "../../../common/utils/utils";

export default function DrawPileAndAdventureDeck() {
  let loadingSeconds = nemosStore((state) =>
    state.debugUseLoading ? state.debugLoading : 1.5
  );

  let motive = nemosStore((state) => state.currentMotive);
  let setDrawPile = nemosStore((state) => state.setDrawPile);
  let setAdventureDeck = nemosStore((state) => state.setAdventureDeck);
  let setSubPhase = nemosStore((state) => state.setSubPhase);

  let [displayText, setDisplayText] = useState(
    "Constructing Draw Pile and Adventure Deck"
  );
  let [loading, setLoading] = useState(true);

  let setupDrawPile = () => {
    let finishedDrawPile: any = [];
    let workingPile: any = [];
    // utils
    function workingToFinished() {
      workingPile = shuffleArray(workingPile);
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
    regularAdventureCards = shuffleArray(regularAdventureCards);
    // finale cards
    let finales = adventureCards.filter((card) => {
      return card.id > 9000 ? true : false;
    });
    finales = shuffleArray(finales);

    // setup deck
    // finale: random finale + 4
    workingPile.push(finales.pop());
    pushNumCardsToWorking(4);
    workingToFinished();

    // act three: rising action + [motive]
    workingPile.push(adventureCards.find((card) => card.id == 1004));
    pushNumCardsToWorking(motives[motive].actThreeCards);
    workingToFinished();

    // second intermission
    finishedDrawPile.push(adventureCards.find((card) => card.id == 1003));

    // act two: rising action + [motive]
    pushNumCardsToWorking(motives[motive].actTwoCards);
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

    // set draw pile
    setDrawPile(finishedDrawPile);

    // set adventure deck from remaining cards
    setAdventureDeck(regularAdventureCards);

    setTimeout(() => {
      setDisplayText("Done!");
      setLoading(false);
    }, loadingSeconds * 1000);
  };

  useEffect(() => {
    setupDrawPile();
  });

  const handleContinue = () => {
    setSubPhase(getSubPhaseNumber("SELECT UPGRADE"));
  };

  return (
    <div>
      <h1 className="loading-text">
        <span>{displayText}</span>
        <div className={loading ? "loader" : ""}></div>
      </h1>
      {!loading && <button onClick={handleContinue}>Continue</button>}
    </div>
  );
}
