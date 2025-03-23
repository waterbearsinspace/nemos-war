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
    case getSubPhaseNumber("MOTIVE"): // 0
      return <MotiveSelector />;
    case getSubPhaseNumber("DRAWPILEANDADVENTUREDECK"): // 1
      return <DrawPileAndAdventureDeck />;
    case getSubPhaseNumber("UPGRADE"): // 2
      return <StartingUpgrade />;
    case getSubPhaseNumber("SHIPS"): // 3
      return <ShipPools />;
    case getSubPhaseNumber("DONE"): // 4
      return <Done />;
    default:
      return <p>Something went wrong!</p>;
  }
}
