// game store
import { nemosStore } from "./common/stores/nemosStore";

// components
import Menu from "./components/Screens/Menu/Menu";
import Setup from "./components/Screens/Setup/Setup";
import Playing from "./components/Screens/Playing/Playing";

// utils
import { getPhaseNumber } from "./common/utils/utils";

// css
import "./Game.css";

export default function Game() {
  // store selectors
  const currentPhase = nemosStore((state) => state.currentPhase);

  // game screens
  return (
    <>
      {/* Menu Screen */}
      {currentPhase == getPhaseNumber("MENU") && <Menu />}

      {/* Setup Screen */}
      {currentPhase == getPhaseNumber("SETUP") && <Setup />}

      {/* Playing Screen */}
      {[
        getPhaseNumber("EVENT"),
        getPhaseNumber("PLACEMENT"),
        getPhaseNumber("ACTION"),
      ].includes(currentPhase) && <Playing />}
    </>
  );
}
