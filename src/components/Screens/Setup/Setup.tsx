// game store
import { nemosStore } from "../../../common/stores/nemosStore";

// components
import MotiveSelector from "./Screens/MotiveSelector";
import DrawPileAndAdventureDeck from "./Screens/DrawPileAndAdventureDeck";
import StartingUpgrade from "./Screens/StartingUpgrade";
import ShipPools from "./Screens/ShipPools";
import Done from "./Screens/Done";
// css
import "./Setup.css";
import { getSubPhaseNumber } from "../../../common/utils/utils";

export default function Setup() {
  const currentSubPhaseNumber = nemosStore((state) => state.currentSubPhase);

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
