// game store
import { nemosStore } from "../../../common/stores/nemosStore";

// components
import MotiveSelector from "./MotiveSelector";
import DrawPileAndAdventureDeck from "./DrawPileAndAdventureDeck";
import StartingUpgrade from "./StartingUpgrade";
import ShipPools from "./ShipPoolsAndTreasures";
import Done from "./Done";

// utils
import { getSubPhaseNumber } from "../../../common/scripts/utils/utils";

// css
import "./Setup.css";

export default function Setup() {
  // store selectors
  const currentSubPhaseNumber = nemosStore((state) => state.currentSubPhase);

  // setup screens
  switch (currentSubPhaseNumber) {
    case getSubPhaseNumber("SELECT MOTIVE"):
      return <MotiveSelector />;
    case getSubPhaseNumber("PREP DRAW PILE AND ADVENTURE DECK"): // 1
      return <DrawPileAndAdventureDeck />;
    case getSubPhaseNumber("SELECT UPGRADE"): // 2
      return <StartingUpgrade />;
    case getSubPhaseNumber("PREP SHIPS"): // 3
      return <ShipPools />;
    case getSubPhaseNumber("CONFIRM SETUP"): // 4
      return <Done />;
    default:
      return <p>Something went wrong!</p>;
  }
}
