import { useState } from "react";
import { nemosStore } from "../../../common/stores/nemosStore";
import AdventureCard from "./AdventureCard";
import { getSubPhaseNumber } from "../../../common/utils/utils";
import { diceStore } from "../../../common/stores/diceStore";

export default function AdventureCardDraw() {
  const subPhase = nemosStore((state) => state.currentSubPhase);
  const drawPile = nemosStore((state) => state.drawPile);
  const adventureDeck = nemosStore((state) => state.adventureDeck);
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
  const setDoneRolling = diceStore((state) => state.setDoneRolling);

  const [flipped, setFlipped] = useState(false);

  function AdventureCardBack() {
    return (
      <div
        className="card-wrapper card-back"
        onClick={() => {
          setFlipped(true);
        }}
      >
        <div className="card-inner-border">
          <section className="card-info">
            <h2>Adventures</h2>
          </section>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    setShowNextPhaseButton(false);
    setDoneRolling(false);
    setSubPhase(
      subPhase == getSubPhaseNumber("DRAW EVENT CARD")
        ? getSubPhaseNumber("RESOLVE EVENT CARD")
        : getSubPhaseNumber("RESOLVE ADVENTURE CARD")
    );
  };

  return (
    <div className="draw-card-wrapper">
      <div className={`draw-card-sides ${flipped ? "flipped" : ""}`}>
        <div className="draw-card-sides-back">
          <AdventureCardBack />
        </div>
        <div className="draw-card-sides-front">
          <AdventureCard
            card={
              subPhase == getSubPhaseNumber("DRAW EVENT CARD")
                ? drawPile[0]
                : adventureDeck[0]
            }
          />
        </div>
      </div>
      {flipped && (
        <div className="next-phase-wrapper">
          <button className="next-phase-button" onClick={handleClick}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
