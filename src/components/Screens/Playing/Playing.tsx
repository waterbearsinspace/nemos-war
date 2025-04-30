//  game store
import { nemosStore } from "../../../common/stores/nemosStore";

// components
import AdventureCardDraw from "../../Cards/AdventureCard/AdventureCardDraw";
import AdventurCardResolution from "../../Cards/AdventureCard/AdventureCardResolution";
import Placement from "./Placement";
import Actions from "./Actions/Actions";
import Move from "./Actions/Move";
import Rest from "./Actions/Rest";

// utils
import { getSubPhaseNumber } from "../../../common/scripts/nemosCore/nemosCoreUtils";

// data and constants
import { gameSubPhases } from "../../../common/stores/slices/gamePhaseSlice";

// TESTING DATA
import cards from "../../../common/data/adventureCards.json";

// css
import "./Playing.css";
import Repair from "./Actions/Repair";
import Search from "./Actions/Search";
import GameOver from "../GameOver";
import Attack from "./Actions/Attack";

export default function Playing() {
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const drawPile = nemosStore((state) => state.drawPile);
  const adventureDeck = nemosStore((state) => state.adventureDeck);
  const notoriety = nemosStore((state) => state.notoriety);
  const nemoValue = nemosStore((state) => state.nemo.value);
  const crewValue = nemosStore((state) => state.crew.value);
  const hullValue = nemosStore((state) => state.hull.value);

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
            {/* <AdventurCardResolution card={cards[23]} /> */}
          </>
        );
      case getSubPhaseNumber("PLACEMENT DICE ROLL"):
      case getSubPhaseNumber("STANDARD PLACEMENT"):
      case getSubPhaseNumber("LULL PLACEMENT"):
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

      case getSubPhaseNumber("ATTACK"):
        return <Attack />;

      case getSubPhaseNumber("INCITE"):
        return <></>;

      case getSubPhaseNumber("MOVE"):
        return (
          <>
            <Move />
          </>
        );

      case getSubPhaseNumber("REST"):
        return <Rest />;

      case getSubPhaseNumber("REPAIR"):
        return <Repair />;

      case getSubPhaseNumber("REFIT"):
        return <></>;

      case getSubPhaseNumber("SEARCH"):
        return <Search />;

      case getSubPhaseNumber("GAME OVER"):
        return <GameOver />;

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
          <p>NOTORIETY: {notoriety}</p>
          <p>NEMO: {nemoValue}</p>
          <p>CREW: {crewValue}</p>
          <p>HULL: {hullValue}</p>
        </section>
      </section>
    </section>
  );
}
