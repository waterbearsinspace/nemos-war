// game store
import { nemosStore } from "../../../common/stores/nemosStore";

// components
import MotiveSelector from "./MotiveSelector";
import DrawPileAndAdventureDeck from "./DrawPileAndAdventureDeck";
import StartingUpgrade from "./StartingUpgrade";
import ShipPools from "./ShipPools";
import Done from "./Done";

// css
import "./Setup.css";
import { getSubPhaseNumber } from "../../../common/utils/utils";

export default function Setup() {
  const currentSubPhaseNumber = nemosStore((state) => state.subPhase);

  switch (currentSubPhaseNumber) {
    case getSubPhaseNumber("SELECT MOTIVE"):
      return <MotiveSelector />;
    case getSubPhaseNumber("PREP DRAW PILE AND ADVENTURE DECK"): // 1
      return <DrawPileAndAdventureDeck />;
    case getSubPhaseNumber("SELECT UPGRADE"): // 2
      return <StartingUpgrade />;
    case getSubPhaseNumber("PREPSHIPS"): // 3
      return <ShipPools />;
    case getSubPhaseNumber("CONFIRM SETUP"): // 4
      return <Done />;
    default:
      return <p>Something went wrong!</p>;
  }
}
