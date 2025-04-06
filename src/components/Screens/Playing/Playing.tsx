//  game store
import AdventurCardResolution from "../../Cards/AdventureCard/AdventureCardResolution";
import { nemosStore } from "../../../common/stores/nemosStore";
import { getSubPhaseNumber } from "../../../common/utils/utils";

import "./Playing.css";
import { diceStore } from "../../../common/stores/diceStore";
import Placement from "./Placement";
import AdventureCardDraw from "../../Cards/AdventureCard/AdventureCardDraw";
import Actions from "./Actions";

export default function Playing() {
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const showNextPhaseButton = nemosStore((state) => state.showNextPhaseButton);
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
  const setDoneRolling = diceStore((state) => state.setDoneRolling);
  const drawPile = nemosStore((state) => state.drawPile);
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
            <AdventurCardResolution id={drawPile[0].id} />
          </>
        );
      case getSubPhaseNumber("PLACEMENT DICE ROLL"):
      case getSubPhaseNumber("STANDARD PLACEMENT"):
        return (
          <>
            <Placement />
          </>
        );
      case getSubPhaseNumber("SELECT ACTION"):
        return <Actions />;

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
      {/* <section className="overlay-bar overlay-bar-top">
        <section className="overlay-bar-content-wrapper">
          <p>{gameSubPhases[currentSubPhase as keyof typeof gameSubPhases]}</p>
        </section>
      </section> */}
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
