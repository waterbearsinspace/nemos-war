// components
import Menu from "./components/Screens/Menu/Menu";
import Setup from "./components/Screens/Setup/Setup";

// game store
import { nemosStore } from "./common/stores/nemosStore";

// css
import "./Game.css";
import Playing from "./components/Screens/Playing/Playing";
import { getPhaseNumber } from "./common/utils/utils";

export default function Game() {
  const currentPhase = nemosStore((state) => state.currentPhase);

  return (
    <>
      {/* Debug Header */}
      {/* {currentPhase != getPhaseNumber("MENU") && <DebugHeader />} */}

      {/* Menu Screen */}
      {currentPhase == getPhaseNumber("MENU") && <Menu />}

      {/* Setup Screen */}
      {currentPhase == getPhaseNumber("SETUP") && <Setup />}

      {/* Playing Screen */}
      {(currentPhase == getPhaseNumber("EVENT") ||
        currentPhase == getPhaseNumber("PLACEMENT") ||
        currentPhase == getPhaseNumber("ACTION")) && <Playing />}
    </>
  );
}
