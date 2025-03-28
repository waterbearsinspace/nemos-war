//  game store
import { useEffect, useState } from "react";
import { nemosStore } from "../../../common/stores/nemosStore";
import { getPhaseNumber, getSubPhaseNumber } from "../../../common/utils/utils";
import AdventureCard from "../../Cards/AdventureCard.tsx/AdventureCard";

export default function Playing() {
  const currentPhase = nemosStore((state) => state.currentPhase);
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const setPhase = nemosStore((state) => state.setCurrentPhase);
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const drawPile = nemosStore((state) => state.drawPile);
  const setDrawPile = nemosStore((state) => state.setDrawPile);

  //  handlePhase()
  //  do currentPhase
  //  if not gameend, call self

  //  # event phase
  //  draw card
  //  resolveCard

  //  # placement phase
  //  roll current act dice
  //  get differential from white dice for AP and placement
  //  if 0, lull turn
  //  for each die, place ship
  //    ignore black if lull turn

  //  # lull turn
  //  place treasure in doubles ocean and on top of adventure deck
  //  crush uprisings
  //
  //  # action phase
  //  adventure
  //  attack
  //  incite
  //  move
  //  rest
  //  repair
  //  refit
  //  search
  //
  //  # check game end conditions
  //  ship resource depleted
  //  notoriety reaches limit
  //  every ocean is full
  //  reach finale card
  //
  function render() {
    switch (currentSubPhase) {
      case getSubPhaseNumber("DRAW EVENT CARD"):
        let drawPileCopy = drawPile;
        return (
          <>
            {AdventureCard({ card: drawPileCopy[0]! })}
            <dialog open={true}>{drawPile.length}</dialog>
            <button
              onClick={() => {
                drawPileCopy.shift();
                setDrawPile(drawPileCopy);
                setSubPhase(getSubPhaseNumber("RESOLVE EVENT CARD"));
              }}
            ></button>
          </>
        );
        break;
      case getSubPhaseNumber("RESOLVE EVENT CARD"):
        console.log("resolve");
        return (
          <button
            onClick={() => setSubPhase(getSubPhaseNumber("DRAW EVENT CARD"))}
          ></button>
        );

      default:
        return (
          <>
            <p>ah</p>
          </>
        );
    }
  }

  return (
    <>
      {render()} <p>yes</p>
    </>
  );
}
