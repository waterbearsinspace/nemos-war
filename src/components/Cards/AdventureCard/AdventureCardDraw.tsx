import { useState } from "react";
import { nemosStore } from "../../../common/stores/nemosStore";
import AdventureCard from "./AdventureCard";
import { getSubPhaseNumber } from "../../../common/scripts/utils/utils";
import { diceStore } from "../../../common/stores/diceStore";
import { useNemosCore } from "../../../common/scripts/nemosCore";

export default function AdventureCardDraw() {
  const subPhase = nemosStore((state) => state.currentSubPhase);
  const drawPile = nemosStore((state) => state.drawPile);
  const adventureDeck = nemosStore((state) => state.adventureDeck);
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
  const setDoneRolling = diceStore((state) => state.setDoneRolling);

  const { setSubPhase } = useNemosCore();

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
        ? "RESOLVE EVENT CARD"
        : "RESOLVE ADVENTURE CARD"
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
