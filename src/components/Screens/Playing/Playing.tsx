//  game store
import { nemosStore } from "../../../common/stores/nemosStore";

// components
import AdventureCardDraw from "../../Cards/AdventureCard/AdventureCardDraw";
import AdventurCardResolution from "../../Cards/AdventureCard/AdventureCardResolution";
import Placement from "./Placement";
import Actions from "./Actions";

// utils
import { getSubPhaseNumber } from "../../../common/utils/utils";

// data and constants
import { gameSubPhases } from "../../../common/stores/slices/gamePhaseSlice";

// css
import "./Playing.css";

export default function Playing() {
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const drawPile = nemosStore((state) => state.drawPile);
  const adventureDeck = nemosStore((state) => state.adventureDeck);
  const nemoValue = nemosStore((state) => state.nemo.value);
  const crewValue = nemosStore((state) => state.crew.value);
  const hullValue = nemosStore((state) => state.hull.value);

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

  function Render() {
    switch (currentSubPhase) {
      case getSubPhaseNumber("DRAW EVENT CARD"):
        return (
          <>
            <AdventureCardDraw />
          </>
        );
      case getSubPhaseNumber("RESOLVE EVENT CARD"):
        return (
          <>
            <AdventurCardResolution card={drawPile[0]} />
          </>
        );
      case getSubPhaseNumber("PLACEMENT DICE ROLL"):
      case getSubPhaseNumber("STANDARD PLACEMENT"):
        return (
          <>
            <Placement />
          </>
        );
      case getSubPhaseNumber("ACTION SELECT"):
        return <Actions />;

      case getSubPhaseNumber("DRAW ADVENTURE CARD"):
        return (
          <>
            <AdventureCardDraw />
          </>
        );

      case getSubPhaseNumber("RESOLVE ADVENTURE CARD"):
        return (
          <>
            <AdventurCardResolution card={adventureDeck[0]} />
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
          <p>{gameSubPhases[currentSubPhase as keyof typeof gameSubPhases]}</p>
        </section>
      </section>
      <div className="playarea">
        <Render />
      </div>
      <section className="overlay-bar overlay-bar-bottom">
        <section className="overlay-bar-content-wrapper">
          <p>NOTORIETY: 0</p>
          <p>NEMO: {nemoValue}</p>
          <p>CREW: {crewValue}</p>
          <p>HULL: {hullValue}</p>
        </section>
      </section>
    </section>
  );
}
