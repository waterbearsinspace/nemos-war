// modules
import { useState } from "react";

// gameState
import { gameStateStore } from "../../common/stores/gameStateStore";

// components
import AdventureCard from "./AdventureCard.tsx/AdventureCard";

export default function AdventureDeck() {
  const [adventureDeckIndex, setAdventureDeckIndex] = useState(0);
  const adventureDeck = gameStateStore((state) => state.adventureDeck);

  let treasuresAvailable = gameStateStore((state) => state.treasuresAvailable);

  const handleClick = (inc: number) => {
    if (adventureDeckIndex + inc > adventureDeck.length - 1) {
      setAdventureDeckIndex(0);
    } else if (adventureDeckIndex + inc < 0) {
      setAdventureDeckIndex(adventureDeck.length - 1);
    } else setAdventureDeckIndex(adventureDeckIndex + inc);
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
      <h2>Adventure Deck</h2>
      <AdventureCard
        card={gameStateStore(
          (state) => state.adventureDeck[adventureDeckIndex]
        )}
      />
      <div
        className="button-wrapper"
        style={{ display: "flex", alignItems: "center" }}
      >
        <button
          onClick={() => {
            handleClick(-1);
          }}
        >
          ←
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <span>Treasures Available: {treasuresAvailable}</span>
          <span>
            {adventureDeck.length == 0
              ? ""
              : adventureDeckIndex + 1 + "/" + adventureDeck.length}
          </span>
        </div>
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
