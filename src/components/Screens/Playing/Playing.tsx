//  game store
import ResolveAdventureCard from "../../Cards/AdventureCard/ResolveAdventureCards";
import { nemosStore } from "../../../common/stores/nemosStore";
import { getSubPhaseNumber } from "../../../common/utils/utils";
import AdventureCard from "../../Cards/AdventureCard/AdventureCard";

import cards from "../../../common/data/adventureCards.json";

import "./Playing.css";

export default function Playing() {
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
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

  function nextSubPhaseButton(nextSubPhase: string, buttonText: string) {
    return (
      <div className="next-phase-wrapper">
        <button
          className="next-phase-button"
          onClick={() => {
            setSubPhase(getSubPhaseNumber(nextSubPhase));
          }}
        >
          {buttonText}
        </button>
      </div>
    );
  }

  function render() {
    switch (currentSubPhase) {
      case getSubPhaseNumber("DRAW EVENT CARD"):
        return (
          <>
            {AdventureCard({ card: drawPile[0]! })}
            {/* {AdventureCard({ card: cards[0] })} */}
            {nextSubPhaseButton("RESOLVE EVENT CARD", "Resolve Card")}
          </>
        );
      case getSubPhaseNumber("RESOLVE EVENT CARD"):
        return (
          <>
            <ResolveAdventureCard id={drawPile[0].id} />
          </>
        );
      case getSubPhaseNumber("PLACEMENT DICE ROLL"):
        return (
          <>
            <p>Rolling for Placement</p>
            {nextSubPhaseButton("STANDARD PLACEMENT", "Standard Placement")}
          </>
        );
      case getSubPhaseNumber("STANDARD PLACEMENT"):
        return (
          <>
            <p>Standard Placement</p>
            {nextSubPhaseButton("SELECT ACTION", "Select Action")}
          </>
        );
      case getSubPhaseNumber("SELECT ACTION"):
        return (
          <>
            <p>Select Action</p>
            {nextSubPhaseButton("DRAW EVENT CARD", "Draw Event Card")}
          </>
        );

      default:
        return (
          <>
            <p>Invalid Subphase: {currentSubPhase}</p>
          </>
        );
    }
  }

  return (
    <section className="game-screen-wrapper">
      <section className="overlay-bar overlay-bar-top">
        <section className="overlay-bar-content-wrapper">
          <p>Top Bar</p>
        </section>
      </section>
      <div className="playarea">{render()}</div>
      <section className="overlay-bar overlay-bar-bottom">
        <section className="overlay-bar-content-wrapper">
          <p>Bottom Bar</p>
        </section>
      </section>
    </section>
  );
}
