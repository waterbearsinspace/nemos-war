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

// TESTING DATA
import cards from "../../../common/data/adventureCards.json";

// css
import "./Playing.css";
import Repair from "./Actions/Repair";
import Search from "./Actions/Search";
import GameOver from "../GameOver";
import Attack from "./Actions/Attack";
import OverlayBarBottom from "../../Resources/OverlayBarBottom";
import OverlayBarTop from "../../Resources/OverlayBarTop";
import Modal from "../Modal/Modal";

export default function Playing() {
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const drawPile = nemosStore((state) => state.drawPile);
  const adventureDeck = nemosStore((state) => state.adventureDeck);
  const showModal = nemosStore((state) => state.showModal);
  const setShowModal = nemosStore((state) => state.setShowModal);

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
            {/* <AdventurCardResolution card={drawPile[0]} /> */}
            <AdventurCardResolution card={cards[33]} />
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
      {showModal && <Modal />}
      <section className="overlay-bar overlay-bar-top">
        <OverlayBarTop />
      </section>
      <div className="playarea">
        <Render />
      </div>
      <section className="overlay-bar overlay-bar-bottom">
        <OverlayBarBottom />
      </section>
    </section>
  );
}
