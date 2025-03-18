// game store
import { nemosStore } from "../../../common/stores/nemosStore";
import { gameSubPhases } from "../../../common/stores/slices/gamePhaseSlice";

// components
import MotiveSelector from "./MotiveSelector";
import DrawPileAndAdventureDeck from "./DrawPileAndAdventureDeck";
import StartingUpgrade from "./StartingUpgrade";
import ShipPools from "./ShipPools";
import Done from "./Done";

// css
import "./Setup.css";

export default function Setup() {
  const currentSubPhaseNumber = nemosStore((state) => state.subPhase);
  const currentSubPhaseName =
    gameSubPhases[currentSubPhaseNumber as keyof typeof gameSubPhases];

  switch (currentSubPhaseName) {
    case "MOTIVE": // 0
      return <MotiveSelector />;
    case "DRAWPILEANDADVENTUREDECK": // 1
      return <DrawPileAndAdventureDeck />;
    case "UPGRADE": // 2
      return <StartingUpgrade />;
    case "SHIPS": // 3
      return <ShipPools />;
    case "DONE": // 4
      return <Done />;
    default:
      return <p>Something went wrong!</p>;
  }
}
