// modules
// import { useEffect, useState } from "react";

// game store
import { nemosStore } from "../../../common/stores/nemosStore";

// utils
// import { shuffleArray } from "../../../common/utils/utils";

function DrawPileList() {
  const drawPile = nemosStore((state) => state.drawPile);

  return (
    <div>
      <h2>Draw Pile</h2>
      <div className="list-wrapper">
        <ul className="card-list">
          {drawPile.map((card) => {
            return (
              <li className={card.id > 1000 ? "bold" : ""}>{card.title}</li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
function AdventureDeck() {
  const adventureDeck = nemosStore((state) => state.adventureDeck);

  return (
    <div>
      <h2>Adventure Deck</h2>
      <div className="list-wrapper">
        <ul className="card-list">
          {adventureDeck.map((card) => {
            return <li>{card.title}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
function ShipPool() {
  const shipPool = nemosStore((state) => state.currentShipPool);

  return (
    <div>
      <h2>Ship Pool</h2>
      <div className="list-wrapper">
        <ul className="card-list">
          {shipPool.map((ship) => {
            return (
              <li>
                {ship.name}: {ship.nationality} {ship.shipClass}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function Done() {
  let motive = nemosStore((state) => state.motiveName);
  let upgrades = nemosStore((state) => state.currentUpgrades);
  let nemo = nemosStore((state) => state.nemo);
  let crew = nemosStore((state) => state.crew);
  let hull = nemosStore((state) => state.hull);

  const handleContinue = () => {
    window.alert("End of Demo");
  };

  return (
    <div className="done-screen-wrapper">
      <h1>Ready to Start!</h1>
      <section className="decks">
        <DrawPileList />
        <AdventureDeck />
        <ShipPool />
      </section>
      <h2>Motive: {motive}</h2>
      <h2>Upgrade {upgrades.length > 0 ? "" : "Not"} Purchased</h2>
      <section>
        <h2>Ship Resources</h2>
        <section className="resources">
          <p>
            <span className="bold">Nemo</span>: {nemo.value}
          </p>
          <p>
            <span className="bold">Crew</span>: {crew.value}
          </p>
          <p>
            <span className="bold">Hull</span>: {hull.value}
          </p>
        </section>
      </section>
      <button onClick={handleContinue}>Begin</button>
    </div>
  );
}
